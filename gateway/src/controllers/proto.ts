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
    req.assert("name", "Name of the protofile should be between 1 and 40 characters long").isLength({ min: 1, max: 40 });
    req.assert("name", "Name of the proto should only contains alphanumeric characters").matches(/^[0-9a-zA-Z]{1,40}$/, "i");
    req.assert("proto", "Content of the protofile should be at least 20 characters long").isLength({ min: 20 });

    const filePath = PROTO_FOLDER + "/" + crypto.createHash("md5").update(req.body.name).digest("hex") + ".proto";

    // If file already exists and no force flag, return an error
    if (fs.existsSync(filePath) && req.query.force === undefined) {
      res.status(400);
      res.json({message: `File ${req.body.name} already exists. Add flag force to your query to overwrite it.`});
      return;
    }

    fs.writeFile(filePath, req.body.proto, function(err) {
      if (err) {
        res.status(400);
        res.json({message: `Can't write file on server. Check write permissions.`});
        return;
      }
    console.log("The file " + filePath + " was saved.");
    // check file can be loaded, erase it otherwise
    let schema = {};
    try {
      grpcService.load(filePath);
      schema = grpcService.schemaParse(filePath);
    } catch (error) {
      fs.unlink(filePath, function(err) {
        if (err) {
          console.log(err);
        }
      });
      res.status(400);
      res.json({message: `Error while loading file: ${error}`});
      return;
    }
    res.status(200);
    res.json({message: `File loaded`, schema: schema});
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
