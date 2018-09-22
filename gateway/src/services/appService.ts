/**
 * Operations that require any of the db, grpc or file service,
 * We want to keep db, file & grpc service independant, so code
 * requiring any of them has to be there.
 */

import { PROTO_FOLDER } from "../config/config";
import * as dbService from "../services/dbService";
import * as fileService from "../services/fileService";
import * as grpcService from "../services/grpcService";

/**
 * Synchronize packages collection in db with content of PROTO_FOLDER
 *  1. Remove content of the "packages" collection
 *  2. load schema of every .proto file in the database
 */
export const refreshDb = () => {
  const db = dbService.openDb();
  const protoFiles = fileService.getProtoFromFolder(PROTO_FOLDER);
  db.set("packages", []).write();
  for (let i = 0, len = protoFiles.length; i < len; i++) {
    const schema = grpcService.protofileToSchema(`${protoFiles[i]}`);
    if (schema !== undefined) {
      dbService.addSchema(schema, protoFiles[i]);
    }
  }
};

/**
 * Check if packages collection is empty
 * Used for --load-once command option.
 */
export const isPackagesCollectionEmpty = () => {
  const db = dbService.openDb();
  return db.get("packages").value().length === 0;
};
