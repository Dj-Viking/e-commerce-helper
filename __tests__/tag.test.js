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


describe("test CRUD on tags", () => {

  it("GET /api/tags get all tags", async () => {
    const getAll = await request(app).get("/api/tags");
    expect(getAll.status).toBe(200);
    const parsed = JSON.parse(getAll.text);
    expect(parsed).toHaveLength(8)
  });

  it("POST /api/tags with no json body", async () => {
    const created = await request(app).post("/api/tags")
    expect(created.status).toBe(400);
    const parsed = JSON.parse(created.text);
    expect(parsed.error).toBe("Bad Request, need to provide a tag_name in the json body");
  });

  it("POST /api/tags create a new tag", async () => {
    const created = await request(app).post("/api/tags").send({
      "tag_name": "new tag" 
    });
    expect(created.status).toBe(200);
    const parsed = JSON.parse(created.text);
    expect(parsed).toStrictEqual({"id": 9, "tag_name": "new tag"})
  });

  it("GET /api/tags/:id get a tag by id", async () => {
    const getOne = await request(app).get("/api/tags/9");
    expect(getOne.status).toBe(200);
    const parsed = JSON.parse(getOne.text);
    expect(parsed).toStrictEqual({"id": 9, "products": [], "tag_name": "new tag"})
  });

  it("GET /api/tags/:id get a tag by bad id", async () => {
    const badId = await request(app).get("/api/tags/aadsfadsfs");
    expect(badId.status).toBe(400);
    const parsed = JSON.parse(badId.text);
    expect(parsed.error).toBe("Bad Request, need to provide a number for the request id parameter");
  });

  it("GET /api/tags/:id get a tag by bad id", async () => {
    const notFound = await request(app).get("/api/tags/12312312");
    expect(notFound.status).toBe(404);
    const parsed = JSON.parse(notFound.text);
    expect(parsed.error).toBe("tag not found");
  });

  it("GET /api/tags get all tags", async () => {
    const getAll = await request(app).get("/api/tags");
    expect(getAll.status).toBe(200);
    const parsed = JSON.parse(getAll.text);
    expect(parsed).toHaveLength(9)
  });

  it("PUT /api/tags/:id update a with no change", async () => {
    const nochange = await request(app).put("/api/tags/9").send({
      tag_name: "new tag"
    });
    expect(nochange.status).toBe(200);
    const parsed = JSON.parse(nochange.text);
    expect(parsed.message).toBe("an update was not performed at this time");
  });

  it("PUT /api/tags/:id update a with no json body", async () => {
    const noBody = await request(app).put("/api/tags/9");
    expect(noBody.status).toBe(400);
    const parsed = JSON.parse(noBody.text);
    expect(parsed.error).toBe("Bad Request, need to provide a tag_name in the json body to update");
  });

  it("PUT /api/tags/:id update of not found tag", async () => {
    const notFound = await request(app).put("/api/tags/3948938493").send({
      tag_name: "new tag"
    });
    expect(notFound.status).toBe(404);
    const parsed = JSON.parse(notFound.text);
    expect(parsed.error).toBe("tag not found");
  });

  it("PUT /api/tags/:id update a with bad id", async () => {
    const badId = await request(app).put("/api/tags/asdfadsf").send({
      tag_name: "new tag"
    });
    expect(badId.status).toBe(400);
    const parsed = JSON.parse(badId.text);
    expect(parsed.error).toBe("Bad Request, the id in the request parameter was not a number");
  });

  it("PUT /api/tags/:id update a tag by id", async () => {
    const updated = await request(app).put("/api/tags/9").send({
      tag_name: "updated tag name"
    });
    expect(updated.status).toBe(200);
    const parsed = JSON.parse(updated.text);
    expect(parsed).toStrictEqual({"updated": {"tag": {"id": 9, "tag_name": "updated tag name"}, "wasUpdated": true}})
  });

  it("DELETE /api/tags/:id delete with bad id", async () => {
    const notFound = await request(app).delete("/api/tags/klsjdfkjd");
    expect(notFound.status).toBe(400);
    const parsed = JSON.parse(notFound.text);
    expect(parsed.error).toBe("Bad Request, the id in the request parameter was not a number");
  });

  it("DELETE /api/tags/:id delete with not found id", async () => {
    const notFound = await request(app).delete("/api/tags/12312312");
    expect(notFound.status).toBe(404);
    const parsed = JSON.parse(notFound.text);
    expect(parsed.error).toBe("tag not found");
  });

  it("DELETE /api/tags/:id delete tag by id", async () => {
    const deleted = await request(app).delete("/api/tags/9");
    expect(deleted.status).toBe(200);
    const parsed = JSON.parse(deleted.text);
    expect(parsed).toBeTruthy();
  });

  it("GET /api/tags/:id to check it was deleted", async () => {
    const getOne = await request(app).get("/api/tags/9");
    expect(getOne.status).toBe(404);
    const parsed = JSON.parse(getOne.text);
    expect(parsed.error).toBe("tag not found");
  });



});