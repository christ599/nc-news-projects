const endpointsJson = require("../endpoints.json");
const data = require("../db/data/test-data/index");
const app = require("../app")
const request = require("supertest")
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */
beforeEach(()=>{
  return seed(data);
})

afterAll(()=>{
  return db.end();
})
describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe("GET /api/topics", () => {
  test("200: Responds with an array of correctly formatted topics objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({body}) => {
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic)=>{
          console.log(topic)
        expect(typeof topic.slug).toBe("string")
        expect(typeof topic.description).toBe("string")
        })
      });
  });
});
describe("GET /api", () => {
  test("404: Responds with a message when sending a non existing endpoint", () => {
    return request(app)
      .get("/api/christianIsFabulous")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("path not valid");
      });
  });
});