const TestServer = require("../TestServer");
const request = require("supertest");
const app = TestServer();
const sequelize = require("../config/connection");
const seedAll = require("../seeds");

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await seedAll();
});

afterAll(async () => {
  // await sequelize.query("DROP TABLE IF EXISTS product_tag");
  // await sequelize.query("DROP TABLE IF EXISTS tag");
  // await sequelize.query("DROP TABLE IF EXISTS product");
  // await sequelize.query("DROP TABLE IF EXISTS category");
  // await sequelize.query("DROP TABLE IF EXISTS category");
  await sequelize.close();
});

describe("CRUD testing of product routes", () => {

  it("POST /api/products create a product", async () => {
    expect(true).toBe(true);
    const product = {
      product_name: "Basketball",
      category_id: 1,
      price: 200.00,
      stock: 3,
      tagIds: [1]
    }

    const createProduct = await request(app)
      .post("/api/products")
      .send(product)
    const parsed = JSON.parse(createProduct.text);

    expect(createProduct.status).toBe(200);

    expect(parsed).toStrictEqual({"product": {"category_id": 1, "id": 8, "price": 200, "product_name": "Basketball", "stock": 3}, "productTags": [{"id": 15, "product_id": 8, "tag_id": 1}]})
  });

});