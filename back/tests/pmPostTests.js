/*
TEST BODY
{
    "code": "sampleCode123",
    "name": "Sample Product",
    "description": "This is a sample product for testing.",
    "price": 50,
    "quantity": 100,
    "inventoryStatus": "INSTOCK",
    "category": "Sample Category",
    "image": "sample-product.jpg",
    "rating": 4
}
*/

pm.test("Status code is 201 Created", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has success status and id", function () {
    let jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
    pm.expect(jsonData.id).to.be.a('number');
});
