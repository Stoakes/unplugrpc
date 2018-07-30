/**
 * All route to CRUD on protofiles.
 */
import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

import { PROTO_FOLDER } from "../config/config";
import * as dbService from "../services/dbService";
import * as grpcService from "../services/grpcService";
import * as fileService from "../services/fileService";

/**
 * Add a new protofile to the index of tracked files.
 * @param req HTTP request
 * @param res HTTP response
 */
export const add = (req: Request, res: Response) => { // API point to add a new proto file.
    req.assert("name", "Name of the protofile cannot be blank").notEmpty();
    req.assert("proto", "Content of the protofile should be at least 20 characters long").isLength({ min: 20 });

    const filename = crypto.createHash("md5").update(req.body.proto +
      (new Date().toISOString())).digest("hex") + ".proto";

    fs.writeFile(PROTO_FOLDER + filename, req.body.proto, function(err) {
      if (err) {
        console.log(err);
        res.send("error");
      }
    console.log("The file " + path.dirname(__filename) + "/protofiles/" + filename + " was saved!");
    // check file can be loaded, erase it otherwise
    try {
      grpcService.load(filename);
    } catch (error) {
      console.log(`Error while loading ${req.body.protoName}.`);
      fs.unlink(filename, function(err) {
        if (err) {
          console.log(err);
          res.send("error");
        }
      });
    }
  });
};

/**
 * Same as add, but only check if the file can be loaded.
 * @param req
 * @param res
 */
export const lint = (req: Request, res: Response) => {
  const isValid = true;

};

export const list = (req: Request, res: Response) => {
  const db = dbService.openDb();
  res.send(db.get("routes"));
};

export const refresh = (req: Request, res: Response) => {
  const db = dbService.openDb();
  const protoFiles = fileService.getProtoFromFolder(PROTO_FOLDER);
  for (let i = 0, len = protoFiles.length; i < len; i++) {
     db.get("routes")
     .push({filename: protoFiles[i], schema: grpcService.protofileToSchema(`${PROTO_FOLDER}/${protoFiles[i]}`)})
     .write();
  }

  res.send(db.get("routes"));
};
