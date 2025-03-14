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
        expect(typeof topic.slug).toBe("string")
        expect(typeof topic.description).toBe("string")
        })
      });
  });
});
describe("GET /api/topics", () => {
  test("404: Responds with a message when sending a non existing endpoint", () => {
    return request(app)
      .get("/api/christianIsFabulous")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("path not valid");
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an article with the selected id", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({body}) => {
        const article = body.article;
        expect(typeof article.author).toBe("string")
        expect(typeof article.title).toBe("string")
        expect(article.article_id).toBe(4)
        expect(typeof article.body).toBe("string")
        expect(typeof article.created_at).toBe("string")
        expect(typeof article.votes).toBe("number")
        expect(typeof article.article_img_url).toBe("string")
      });
  });
  test("404: Responds with an article where id does not exist", () => {
    return request(app)
      .get("/api/articles/88")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: Responds with an invalid id", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("GET /api/articles", () => {
  test("200: Should respond with an array of all articles which include correct properties (including comment_count but excluding body).", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body}) => {
        const { article } = body
      expect(article.length).toBe(13);
          article.forEach((article) => {
            expect(article).toMatchObject({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String)
            });
          });
      });
  });
});
describe("GET /api/articles", () => {
  test("404: Responds with a message if the endpoint does not exist", () => {
    return request(app)
      .get("/api/christian")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("path not valid");
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("200: Should respond witn array of comments for the given article_id which include correct properties.", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({body}) => {
        const {comments} = body
        expect(comments.length).toBe(11);
        comments.forEach((comment)=>{
        expect(typeof comment.comment_id).toBe("number"),
        expect(typeof comment.votes).toBe("number")
        expect(typeof comment.created_at).toBe("string"),
        expect(typeof comment.author).toBe("string"),
        expect(typeof comment.body).toBe("string")
        expect( comment.article_id).toBe(1)
        })
      });
  });
  test("200: Responds with 200 if article_id exist but no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({body}) => {
        expect(body.comments).toEqual([]);
      });
  });
  test("404: Responds with 404 if article_id does not exist", () => {
    return request(app)
      .get("/api/articles/88/comments")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: Respond with 400 if article_id is not a number", () => {
    return request(app)
      .get("/api/articles/orange/comments")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("bad request");
      });
  });
});