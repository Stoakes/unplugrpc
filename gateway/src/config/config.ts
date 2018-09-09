import * as path from "path";

export const DB_PATH =
  process.env.NODE_ENV === "test"
    ? path.join(__filename, "/../../../data/db.test.json")
    : path.join(__filename, "/../../../data/db.json");
export const PROTO_FOLDER =
  process.env.NODE_ENV === "test"
    ? path.join(__filename, "/../../../data/protoFolderTest")
    : path.join(__filename, "/../../../data/protoFolder");
