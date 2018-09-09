import "jest";
import request from "supertest";

import newApp from "../src/app";
import * as helper from "./testHelper";

const app = newApp(false);

describe("List packages", () => {
  beforeAll(() => {
    helper.createDatabaseTest();
    helper.createProtoFolderTest();
  });

  afterAll(() => {
    helper.deleteDatabaseTest();
    helper.deleteProtoFolderTest();
  });

  it("GET /packages returns an empty list", done => {
    request(app)
      .get("/packages")
      .expect(200, "[]")
      .end(done);
  });

  // it("Import a proto file", done => {
  //   request(app)
  //     .post("/protos")
  //     .send({ name: "hello.proto" });
  // });
});
