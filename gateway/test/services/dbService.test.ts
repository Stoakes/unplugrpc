import LodashWrapper from "lowdb";
import path from "path";
import { PROTO_FOLDER } from "../../src/config/config";
import * as dbService from "../../src/services/dbService";
import { Schema } from "../../src/types/types";
import * as helper from "../testHelper";

describe("Database service", () => {
  beforeEach(() => {
    helper.createDatabaseTest();
  });

  afterEach(() => {
    helper.deleteDatabaseTest();
  });

  const validEmptySchema: Schema = {
    enums: [],
    extends: [],
    import: [],
    messages: [],
    options: undefined,
    package: "routeguide",
    services: [],
    syntax: 3
  };

  it("Open empty db returns empty arrays", () => {
    expect(
      dbService
        .openDb()
        .get("packages")
        .value()
    ).toHaveLength(0);
    expect(
      dbService
        .openDb()
        .get("hosts")
        .value()
    ).toHaveLength(0);
  });

  it("addSchema with an empty schema", () => {
    dbService.addSchema(validEmptySchema, "routeguide.proto");
    expect(
      dbService
        .openDb()
        .get("packages")
        .value()
    ).toHaveLength(1);
    const insertedPackage = dbService
      .openDb()
      .get("packages")
      .value()[0];
    expect(insertedPackage.filePath).toEqual("routeguide.proto");
    expect(insertedPackage.name).toEqual("routeguide");
    expect(insertedPackage.schema.messages).toHaveLength(0);
    expect(insertedPackage.schema.package).toEqual("routeguide");
    expect(insertedPackage.schema.syntax).toEqual(3);
  });

  it("addSchema with a filePath beginning by PROTO_FOLDER", () => {
    dbService.addSchema(
      validEmptySchema,
      path.join(PROTO_FOLDER, "routeguide.proto")
    );
    expect(
      dbService
        .openDb()
        .get("packages")
        .value()[0].filePath
    ).toEqual("routeguide.proto");
  });

  it("addSchema with an already existing package (same name) does nothing", () => {
    dbService.addSchema(
      validEmptySchema,
      path.join(PROTO_FOLDER, "routeguide.proto")
    );
    dbService.addSchema(
      validEmptySchema,
      path.join(PROTO_FOLDER, "routeguide.proto")
    );
    expect(
      dbService
        .openDb()
        .get("packages")
        .value()
    ).toHaveLength(1);
    dbService.addSchema(
      { ...validEmptySchema, package: "route2" },
      path.join(PROTO_FOLDER, "routeguide.proto")
    );
    expect(
      dbService
        .openDb()
        .get("packages")
        .value()
    ).toHaveLength(2);
  });
});
