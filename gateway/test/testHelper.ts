/**
 * Contain some helper functions to create and clean
 * test folder & database
 */

import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import { DB_PATH, PROTO_FOLDER } from "../src/config/config";

export const createProtoFolderTest = () => {
  if (!fs.existsSync(PROTO_FOLDER)) {
    mkdirp.sync(PROTO_FOLDER);
  }
};
export const deleteProtoFolderTest = () => {
  const deleteFolderRecursive = folder => {
    if (fs.existsSync(folder)) {
      fs.readdirSync(folder).forEach((file, index) => {
        const curPath = path.join(folder, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          deleteFolderRecursive(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(folder);
    }
  };
  deleteFolderRecursive(PROTO_FOLDER);
};

export const createDatabaseTest = () => {
  if (!fs.existsSync(DB_PATH)) {
    fs.copyFileSync(path.join(path.dirname(DB_PATH), "db.json.dist"), DB_PATH);
  }
};
export const deleteDatabaseTest = () => {
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
  }
};
