import { PROTO_FOLDER } from "../config/config";

/**
 * Functions for every grpc related interactions
 */

import * as fs from "fs";
import * as grpc from "grpc";
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
export const load = (path: string): any => {
  if (!path.startsWith(PROTO_FOLDER)) {
    path = PROTO_FOLDER + "/" + path;
  }
  return grpc.load(path);
};

/**
 * Return the representation of a protofile
 * @param path
 */
export const schemaParse = (path: string) => {
  if (!path.startsWith(PROTO_FOLDER)) {
    path = PROTO_FOLDER + "/" + path;
  }
  return schema.parse(fs.readFileSync(path));
};
