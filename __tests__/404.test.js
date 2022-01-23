const TestServer = require("../TestServer");
const request = require("supertest");
const app = TestServer();

describe("test 404 route", () => {

  it("GET /blah test the 404 catch all route", async () => {
    const notFound = await request(app).get("/blah");
    expect(notFound.status).toBe(404)
  });

});