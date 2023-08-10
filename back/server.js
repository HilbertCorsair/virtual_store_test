import express from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
    host: 'localhost',
    user: 'jean',
    password: 'jeans_password',
    database: 'alten_main'
}

// Retrieve all products
app.get('/products', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [products] = await connection.query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    res.status(500).send('Error while fetching all products');
  } finally {
    if (connection) connection.end();
  }
});

// Retrieve a specific product by ID
app.get('/products/:id', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [product] = await connection.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(product[0]);
  } catch (error) {
    res.status(500).send('Error fetching the product');
  } finally {
    if (connection) connection.end();
  }
});

// Create new product
app.post('/products', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const result = await connection.query('INSERT INTO products SET ?', req.body);
    res.status(201).json({ success: true, id: result[0].insertId });
  } catch (error) {
    res.status(500).send('Error creating the product');
  } finally {
    if (connection) connection.end();
  }
});

// Update product by ID
app.patch('/products/:id', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.query('UPDATE products SET ? WHERE id = ?', [req.body, req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).send('Error while updating product');
  } finally {
    if (connection) connection.end();
  }
});

// Delete product by ID
app.delete('/products/:id', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).send('Error while deleting product');
  } finally {
    if (connection) connection.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server listenning on http://localhost:${PORT}`);
});
