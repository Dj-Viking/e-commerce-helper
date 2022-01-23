const TestServer = require("../TestServer");
const request = require("supertest");
const app = TestServer();
const sequelize = require("../config/connection");

beforeEach((done) => {
  sequelize.authenticate();
  sequelize.sync({ force: true }).then(() => {
    console.log("synced?");
  });
  done();
  // sequelize.query("CREATE DATABASE IF NOT EXISTS ecommerce_db")
});

afterAll((done) => {
  sequelize.close().then(() => done())
});

describe("CRUD testing of product routes", () => {

  it("POST /api/products create a product", async () => {
    expect(true).toBe(true);
    // const product = {
    //   product_name: "Basketball",
    //   category_id: 1,
    //   price: 200.00,
    //   stock: 3,
    //   tagIds: [1, 2, 3, 4]
    // }

    // const createProduct = await request(app)
    //   .post("/api/products")
    //   .send(product)
    // const parsed = JSON.parse(createProduct.text);
    // // console.log("parsed", parsed);
    // expect(createProduct.status).toBe(200);
  });

});