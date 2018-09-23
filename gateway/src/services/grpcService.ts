import { PROTO_FOLDER } from "../config/config";

/**
 * Functions for every grpc related interactions
 */

import * as grpcLoader from "@grpc/proto-loader";
import * as fs from "fs";
import * as grpc from "grpc";
import * as path from "path";
// tslint:disable-next-line
const schema = require("protocol-buffers-schema");

/**
 *
 * @param protofilePath
 * @param includePath
 */
export const protofileToSchema = (protofilePath: string) => {
  if (!protofilePath.startsWith(PROTO_FOLDER)) {
    protofilePath = path.join(PROTO_FOLDER, protofilePath);
  }
  try {
    load(protofilePath);
    return schema.parse(fs.readFileSync(protofilePath));
  } catch (error) {
    throw new Error(
      `${protofilePath} can't be loaded: ${error.message}. Ignoring.`
    );
  }
};

/**
 * Simple alias to load function, to avoid importing grpc servcie in controllers.
 * This should be the only method used to load a definition. Don't do loadSync in your methods
 * @param pathString path to proto relatively to PROTO_FOLDER (proto root)
 */
export const load = (pathString: string): any => {
  const packageDefinition = grpcLoader.loadSync(pathString, {
    includeDirs: [PROTO_FOLDER]
  });
  return grpc.loadPackageDefinition(packageDefinition);
};

/**
 * Return the representation of a protofile
 * @param path
 */
export const schemaParse = (pathString: string) => {
  if (!pathString.startsWith(PROTO_FOLDER)) {
    pathString = path.join(PROTO_FOLDER, pathString);
  }
  return schema.parse(fs.readFileSync(pathString));
};
