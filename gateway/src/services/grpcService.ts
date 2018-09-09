import { PROTO_FOLDER } from "../config/config";

/**
 * Functions for every grpc related interactions
 */

import * as fs from "fs";
import * as grpc from "grpc";
import * as path from "path";
// tslint:disable-next-line
const schema = require("protocol-buffers-schema");

export const protofileToSchema = (
  protofilePath: string,
  includePath: string = undefined
) => {
  try {
    grpc.load(protofilePath);
  } catch (error) {
    console.log(`${protofilePath} can't be loaded, ignoring.`);
    return undefined;
  }
  return schema.parse(fs.readFileSync(protofilePath));
};

/**
 * Simple alias to load function, to avoid importing grpc servcie in controllers.
 * @param path
 */
export const load = (pathString: string): any => {
  if (!pathString.startsWith(PROTO_FOLDER)) {
    pathString = path.join(PROTO_FOLDER, pathString);
  }
  return grpc.load(pathString);
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
