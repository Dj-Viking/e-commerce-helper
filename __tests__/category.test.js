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
 * category type
 * @type {{
 *   category_name: string;
 *   id: number;
 * }}
 */

describe("Test CRUD on the category routes", () => {

  it("POST /api/categories create a category", async () => {
    const created1 = await request(app).post("/api/categories").send({
      category_name: "new category"
    });
    expect(created1.status).toBe(200);
    const parsed = JSON.parse(created1.text);
    expect(parsed).toStrictEqual({
      created: {
        "category": {
          "category_name": "new category",
          "id": 6,
        },
      }
    });
  });

  it("POST /api/categories create a category with no json body", async () => {
    const created = await request(app).post("/api/categories");
    expect(created.status).toBe(400);
    const parsed = JSON.parse(created.text);
    expect(parsed.error).toBe("Must provide a category_name field in the json body to create a category");
  });

  it("GET /api/categories all categories", async () => {
    const getAll = await request(app).get("/api/categories");
    expect(getAll.status).toBe(200);
    expect(JSON.parse(getAll.text)).toHaveLength(6);
  });

  it("GET /api/categories/:id get category by id", async () => {
    const getOne = await request(app).get("/api/categories/6");
    expect(getOne.status).toBe(200);
    const parsed = JSON.parse(getOne.text);
    expect(parsed.category.id).toBe(6);
    expect(parsed.category.category_name).toBe("new category");
  });

  it("GET /api/categories/:id get category by a bad id", async () => {
    const badId = await request(app).get("/api/categories/kdsjfdjkf");
    expect(badId.status).toBe(400);
    const parsed = JSON.parse(badId.text);
    expect(parsed).toBeTruthy();
    expect(parsed.error).toBe("Bad Request, must provide a number as an id parameter.");
  });

  it("GET /api/categories/:id try to get a not found category", async () => {
    const notFound = await request(app).get("/api/categories/287382738723");
    expect(notFound.status).toBe(404);
    const parsed = JSON.parse(notFound.text);
    expect(parsed).toBeTruthy();
    expect(parsed.error).toBe("category not found by that id");
  });

  it("PUT /api/categories/:id update category by id", async () => {
    const update = await request(app).put("/api/categories/6").send({
      category_name: "changed"
    });
    expect(update.status).toBe(200);
    const parsed = JSON.parse(update.text);
    expect(parsed.update.updatedCategory.category_name).toBe("changed");
  });

  it("PUT /api/categories/:id update category with bad id param", async () => {
    const badId = await request(app).put("/api/categories/kdjkdj").send({
      category_name: "changed2"
    });
    expect(badId.status).toBe(400);
    expect(JSON.parse(badId.text).error).toBe("Bad Request, the id parameter must be a number.");
  });

  it("PUT /api/categories/:id update category with bad id param", async () => {
    const noBody = await request(app).put("/api/categories/6").send({
      category_name: void 0
    });
    expect(noBody.status).toBe(400);
    expect(JSON.parse(noBody.text).error).toBe("Bad Request, need to provide a category_name field to update.");
  });

  it("PUT /api/categories/:id update category with bad id param", async () => {
    const noChange = await request(app).put("/api/categories/6").send({
      category_name: "changed"
    });
    expect(noChange.status).toBe(200);
    expect(JSON.parse(noChange.text).message).toBe("an update was not performed from this request");
  });

  it("DELETE /api/categories/:id delete a category by id", async () => {
    const deleted = await request(app).delete("/api/categories/6");
    expect(deleted.status).toBe(200);
  });
  
  it("GET /api/categories/:id get a category by id to check that it's gone", async () => {
    const getDeleted = await request(app).delete("/api/categories/6");
    expect(getDeleted.status).toBe(404);
    expect(JSON.parse(getDeleted.text).error).toBe("category not found");
  });

  it("DELETE /api/categories/:id delete a category by bad id", async () => {
    const deleted = await request(app).delete("/api/categories/123123123");
    expect(deleted.status).toBe(404);
    expect(JSON.parse(deleted.text).error).toBe("category not found");
  });

  it("DELETE /api/categories/:id delete a category by bad id", async () => {
    const deleted = await request(app).delete("/api/categories/adsfdsf");
    expect(deleted.status).toBe(400);
    expect(JSON.parse(deleted.text).error).toBe("Bad Request, need to provide a number as a category id");
  });

});
