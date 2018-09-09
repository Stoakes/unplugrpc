import request from "supertest";
import newApp from "../src/app";

const app = newApp(false);

describe("GET /", () => {
  it("should return 200 OK", done => {
    return request(app)
      .get("/")
      .expect(200)
      .end(done);
  });
});
