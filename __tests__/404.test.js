const TestServer = require("../TestServer");
const request = require("supertest");
const app = TestServer();
const sequelize = require("../config/connection");

beforeEach((done) => {
  sequelize.authenticate().then(() => done());
});

afterEach((done) => {
  sequelize.close().then(() => done())
});

describe("test 404 route", () => {

  it("GET /blah test the 404 catch all route", async () => {
    const notFound = await request(app).get("/blah");
    expect(notFound.status).toBe(404)
  });

});