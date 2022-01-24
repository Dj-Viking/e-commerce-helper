const TestServer = require("../TestServer");
const request = require("supertest");
const app = TestServer();
const sequelize = require("../config/connection");
const seedAll = require("../seeds");

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await seedAll();
});

afterAll(async () => {
  await sequelize.close();
});


/**
 * product create return type
 * @type {{
 *   category_id: number;
 *   id: number;
 *   price: number;
 *   product_name: string;
 *   stock: number;
 *   category: {
 *     category_name: string;
 *     id: number;
 *   }
 *   tags: Array<{ 
 *     id: number; 
 *     tag_name: string;
 *     product_tag: { 
 *       id: number; 
 *       product_id: number;
 *       tag_id: number;
 *     }
 *   }>;
 * }}
 */

describe("CRUD testing of product routes", () => {

  it("POST /api/products create a product", async () => {
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

    expect(parsed).toStrictEqual({"product": {"category_id": 1, "id": 6, "price": 200, "product_name": "Basketball", "stock": 3}, "productTags": [{"id": 13, "product_id": 6, "tag_id": 1}]});
    productId = parsed.id;

  });

  it("POST /api/products post a product without tagIds param", async () => {
    const product = {
      product_name: "Basketball",
      category_id: 1,
      price: 200.00,
      stock: 3,
    }
    const createProduct = await request(app)
      .post("/api/products")
      .send(product)
    expect(createProduct.status).not.toBe(200);
  });

  it("GET /api/products get all products", async () => {
    const getAll = await request(app).get("/api/products");
    expect(getAll.status).toBe(200);
    const parsed = JSON.parse(getAll.text);
    expect(parsed).toHaveLength(6);
  });

  it("GET /api/product/:id get a product by id", async () => {
    const getOne = await request(app).get(`/api/products/1`);
    expect(getOne.status).toBe(200);
    const parsed = JSON.parse(getOne.text);
    expect(parsed).toBeTruthy();
  });

  it("PUT /api/product/:id update a product by id", async () => {
    const updated = {
      product_name: "Basketball",
      category_id: 4,
      price: 20033,
      stock: 12,
      tagIds: [1, 2, 3]
    }
    const updateProduct = await request(app).put("/api/products/1").send(updated);
    expect(updateProduct.status).toBe(200);
    const parsed = JSON.parse(updateProduct.text);
    expect(parsed.updated).toBe(true)
  });

  it("GET /api/product/:id check the updated product has a changed price", async () => {
    const verify = await request(app).get("/api/products/1");
    expect(verify.status).toBe(200);
    const parsed = JSON.parse(verify.text);
    expect(parsed.price).toBe(20033);
    expect(parsed.tags.length).toBe(3)

  });

  it("PUT /api/product/:id update a product by id with not valid id param", async () => {
    const updated = {
      product_name: "Basketball",
      category_id: 4,
      price: 200.00,
      stock: 32323,
      tagIds: [1, 2, 3, 4]
    }
    const updateProduct = await request(app).put("/api/products/asdfaksdjf").send(updated);
    expect(updateProduct.status).toBe(400);
  });

  it("DELETE /api/product/:id delete a product by id", async () => {
    const deleted = await request(app).delete("/api/products/1");
    expect(deleted.status).toBe(200);
  });

  it("GET /api/product/:id check the product was deleted", async () => {
    const wasDeleted = await request(app).get("/api/products/1");
    expect(wasDeleted.status).toBe(404);
    expect(JSON.parse(wasDeleted.text).error).toBe("product not found");
  })

  it("DELETE /api/product/:id delete a product by id with wrong id", async () => {
    const deleted = await request(app).delete("/api/products/kdjfkdjf");
    expect(deleted.status).toBe(500);
    expect(JSON.parse(deleted.text).error).toBe("need to provide an id")
  });

});