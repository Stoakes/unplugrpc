import "jest";
import request from "supertest";

import newApp from "../src/app";
import * as helper from "./testHelper";

const app = newApp(false);

describe("Create an hosts", () => {
  beforeAll(() => {
    helper.createDatabaseTest();
    helper.createProtoFolderTest();
  });

  afterAll(() => {
    helper.deleteDatabaseTest();
    helper.deleteProtoFolderTest();
  });

  it("GET /hosts returns an empty list", done => {
    request(app)
      .get("/hosts")
      .expect(200, "[]")
      .end(done);
  });

  it("POST /hosts with an empty object fails", done => {
    request(app)
      .post("/hosts")
      .send({})
      .expect(400, `{"level":"error","message":"Host can not be empty"}`)
      .end(done);
  });

  it("POST /hosts with an invalid object fails", done => {
    request(app)
      .post("/hosts")
      .send({ blabla: "blabla" })
      .expect(400, `{"level":"error","message":"Host can not be empty"}`)
      .end(done);
  });

  it("POST /hosts with an invalid host fails", done => {
    request(app)
      .post("/hosts")
      .send({ host: "http://blabla" })
      .expect(
        400,
        `{"level":"error","message":"Host is not recognized as valid host value"}`
      )
      .end(done);
  });

  it("POST /hosts with an invalid host fails 2", done => {
    request(app)
      .post("/hosts")
      .send({ host: "bla:bla" })
      .expect(
        400,
        `{"level":"error","message":"Host is not recognized as valid host value"}`
      )
      .end(done);
  });

  it("POST /hosts with an invalid host fails 3", done => {
    request(app)
      .post("/hosts")
      .send({ host: "bla{bla" })
      .expect(
        400,
        `{"level":"error","message":"Host is not recognized as valid host value"}`
      )
      .end(done);
  });

  it("POST /hosts without port property fails", done => {
    request(app)
      .post("/hosts")
      .send({ host: "blabla" })
      .expect(400, `{"level":"error","message":"Port can not be empty"}`)
      .end(done);
  });

  it("POST /hosts with invalid port property fails", done => {
    request(app)
      .post("/hosts")
      .send({ host: "blabla", port: "blabla" })
      .expect(
        400,
        `{"level":"error","message":"Port is not recognized as valid port"}`
      )
      .end(done);
  });

  it("POST /hosts with too high port property fails", done => {
    request(app)
      .post("/hosts")
      .send({ host: "blabla", port: 94562566 })
      .expect(
        400,
        `{"level":"error","message":"Port is not recognized as valid port"}`
      )
      .end(done);
  });

  it("POST /hosts with negative port property fails", done => {
    request(app)
      .post("/hosts")
      .send({ host: "blabla", port: -1 })
      .expect(
        400,
        `{"level":"error","message":"Port is not recognized as valid port"}`
      )
      .end(done);
  });

  it("POST /hosts with an object with negative port property fails", done => {
    request(app)
      .post("/hosts")
      .send({ host: "blabla", port: -1 })
      .expect(
        400,
        `{"level":"error","message":"Port is not recognized as valid port"}`
      )
      .end(done);
  });

  it("POST /hosts with a valid host object succeed", done => {
    request(app)
      .post("/hosts")
      .send({ host: "blabla", port: 8000 })
      .expect(200)
      .end(done);
  });

  it("POST /hosts with a valid host object (but invalid port type) succeed", done => {
    request(app)
      .post("/hosts")
      .send({ host: "blabla", port: "8001" })
      .expect(200)
      .end(done);
  });

  it("POST /hosts with a valid host object succeed 2", done => {
    request(app)
      .post("/hosts")
      .send({ host: "bla.bla", port: 8000 })
      .expect(200)
      .end(done);
  });

  it("POST /hosts with a valid host object succeed 3", done => {
    request(app)
      .post("/hosts")
      .send({ host: "bla.bla.10.bla.10", port: 1000 })
      .expect(200)
      .end(done);
  });

  it("POST /hosts with a valid host object succeed 4", done => {
    request(app)
      .post("/hosts")
      .send({ name: "blabla", host: "blabla", port: 1000 })
      .expect(200)
      .end(done);
  });

  it("POST /hosts with an already existing host fails", done => {
    request(app)
      .post("/hosts")
      .send({ name: "blabla", host: "blabla", port: 1000 })
      .expect(
        400,
        `{"level":"error","message":"An host with similar host and port already exists"}`
      )
      .end(done);
  });
});

describe("Update an hosts", () => {
  beforeAll(() => {
    helper.createDatabaseTest();
    helper.createProtoFolderTest();
  });

  afterAll(() => {
    helper.deleteDatabaseTest();
    helper.deleteProtoFolderTest();
  });

  it("GET /hosts returns an empty list", done => {
    request(app)
      .get("/hosts")
      .expect(200, "[]")
      .end(done);
  });

  it("Create an host", done => {
    request(app)
      .post("/hosts")
      .send({ host: "blabla", port: 1000 })
      .expect(200)
      .end(done);
  });

  it("Host is created", done => {
    request(app)
      .get("/hosts")
      .expect(200, `[{"name":"blabla:1000","host":"blabla","port":1000}]`)
      .end(done);
  });

  it("PUT /hosts with an invalid host fails", done => {
    request(app)
      .put("/hosts/blabla:1000")
      .send({ host: "http://blabla" })
      .expect(
        400,
        `{"level":"error","message":"Host is not recognized as valid host value"}`
      )
      .end(done);
  });

  it("PUT /hosts with an invalid host fails 2", done => {
    request(app)
      .put("/hosts/blabla:1000")
      .send({ host: "bla:bla" })
      .expect(
        400,
        `{"level":"error","message":"Host is not recognized as valid host value"}`
      )
      .end(done);
  });

  it("PUT /hosts without port property fails", done => {
    request(app)
      .put("/hosts/blabla:1000")
      .send({ host: "blabla" })
      .expect(400, `{"level":"error","message":"Port can not be empty"}`)
      .end(done);
  });

  it("PUT /hosts with invalid port property fails", done => {
    request(app)
      .put("/hosts/blabla:1000")
      .send({ host: "blabla", port: "blabla" })
      .expect(
        400,
        `{"level":"error","message":"Port is not recognized as valid port"}`
      )
      .end(done);
  });

  it("PUT /hosts with too high port property fails", done => {
    request(app)
      .put("/hosts/blabla:1000")
      .send({ host: "blabla", port: 94562566 })
      .expect(
        400,
        `{"level":"error","message":"Port is not recognized as valid port"}`
      )
      .end(done);
  });

  it("PUT /hosts to update the port", done => {
    request(app)
      .put("/hosts/blabla:1000")
      .send({ host: "blabla", port: 2000 })
      .expect(200, `{"level":"success","message":"Host updated"}`)
      .end(done);
  });

  it("Port & name are updated", done => {
    request(app)
      .get("/hosts")
      .expect(200, `[{"name":"blabla:2000","host":"blabla","port":2000}]`)
      .end(done);
  });

  it("PUT /hosts to update the name", done => {
    request(app)
      .put("/hosts/blabla:2000")
      .send({ name: "blabla", host: "blabla", port: 2000 })
      .expect(200, `{"level":"success","message":"Host updated"}`)
      .end(done);
  });

  it("Name is updated", done => {
    request(app)
      .get("/hosts")
      .expect(200, `[{"name":"blabla","host":"blabla","port":2000}]`)
      .end(done);
  });

  it("PUT /hosts to update the host", done => {
    request(app)
      .put("/hosts/blabla:2000")
      .send({ name: "blabla", host: "pingpong", port: 2000 })
      .expect(200, `{"level":"success","message":"Host updated"}`)
      .end(done);
  });

  it("Host is updated, name is not", done => {
    request(app)
      .get("/hosts")
      .expect(200, `[{"name":"blabla","host":"pingpong","port":2000}]`)
      .end(done);
  });
});

describe("Delete an hosts", () => {
  beforeAll(() => {
    helper.createDatabaseTest();
    helper.createProtoFolderTest();
  });

  afterAll(() => {
    helper.deleteDatabaseTest();
    helper.deleteProtoFolderTest();
  });

  it("GET /hosts returns an empty list", done => {
    request(app)
      .get("/hosts")
      .expect(200, "[]")
      .end(done);
  });

  it("Create an host", done => {
    request(app)
      .post("/hosts")
      .send({ host: "blabla", port: 1000 })
      .expect(200)
      .end(done);
  });

  it("Host is created", done => {
    request(app)
      .get("/hosts")
      .expect(200, `[{"name":"blabla:1000","host":"blabla","port":1000}]`)
      .end(done);
  });

  it("DELETE /hosts with an unknown host fails", done => {
    request(app)
      .delete("/hosts/pingpong:1000")
      .expect(404, `{"level":"error","message":"Host does not exist"}`)
      .end(done);
  });

  it("DELETE /hosts with an invalid port fails", done => {
    request(app)
      .delete("/hosts/blabla:-1")
      .expect(
        400,
        `{"level":"error","message":"Port parameter is not recognized as valid port"}`
      )
      .end(done);
  });

  it("DELETE /hosts with an valid object succeed", done => {
    request(app)
      .delete("/hosts/blabla:1000")
      .expect(200, `{"level":"success","message":"Host deleted"}`)
      .end(done);
  });
});
