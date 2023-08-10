import mysql from 'mysql2/promise';
import { readFile } from 'fs/promises';

async function getProducts(file = "../front/src/assets/products.json") {
    try {
        const products = await readFile(file, 'utf-8');
        return JSON.parse(products);
    } catch (error) {
        console.error('Failed to load Products JSON data:', error);
        return null;
    }
}

const dbConfig = {
    host: 'localhost',
    user: 'jean',
    password: 'jeans_password',
    database: 'alten_main'
}

const createTableSQL = `
    CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(35),
    name VARCHAR(25),
    description TEXT,
    price DECIMAL(10, 2),
    quantity INT,
    inventoryStatus VARCHAR(25),
    category VARCHAR(25),
    image VARCHAR(255),
    rating DECIMAL(3, 2)
    )
`;

const insertProductSQL = `INSERT INTO products
    (code, name, description, image, price, category, quantity, inventoryStatus, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const createProductsTable = async (sqlRequest = createTableSQL, config = dbConfig) => {
    const connection = await mysql.createConnection(config);
    await connection.query(sqlRequest);
    connection.end();
}

const insertProducts = async (products) => {
    const connection = await mysql.createConnection(dbConfig);
    for (const product of products.data){
        const values = [
            product.code,
            product.name,
            product.description,
            product.image,
            product.price,
            product.category,
            product.quantity,
            product.inventoryStatus,
            product.rating
        ];
        await connection.query(insertProductSQL, values);
    }
    connection.end();
}

// Main execution starts here
(async () => {
    try {
        const products = await getProducts();
        await createProductsTable();
        await insertProducts(products);
    } catch (error) {
        console.error('An error occurred, I have no idea why, but it looks like this : ', error);
    }
})();
