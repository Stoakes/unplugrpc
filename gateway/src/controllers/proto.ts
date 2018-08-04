/**
 * All route to CRUD on protofiles.
 */
import { Request, Response } from "express";
import * as fs from "fs";
import red from "chalk";

import { PROTO_FOLDER } from "../config/config";
import * as dbService from "../services/dbService";
import * as grpcService from "../services/grpcService";
import * as fileService from "../services/fileService";
import { Schema } from "../types/types";
const grpc = require("grpc");

/**
 * Add a new protofile to the index of tracked files.
 * @param req HTTP request
 * @param res HTTP response
 */
export const add = (req: Request, res: Response) => { // API point to add a new proto file.
    req.assert("name", "Name of the protofile cannot be blank").notEmpty();
    req.assert("name", "Name of the protofile should be between 1 and 40 characters long").isLength({ min: 1, max: 40 });
    req.assert("name", "Name of the proto should only contains alphanumeric characters").matches(/^[0-9a-zA-Z]{1,40}$/, "i");
    req.assert("path", "Path should not be empty").notEmpty();
    req.assert("path", "Path should be between 7 and 40 characters long").isLength({ min: 7, max: 40 });
    req.assert("path", "Path can not contains ..${[()]}\| characters").customSanitizer(
      value => !new RegExp("\{|\[|\(|\.\.|\]|\)|\}|\$|\\").test(value));
    req.assert("path", "Path should end with .proto").customSanitizer(value => value.endsWith(".proto"));
    req.assert("proto", "Content of the protofile should be at least 20 characters long").isLength({ min: 20 });

    const filePath = PROTO_FOLDER + "/" + req.body.path;

    // If file already exists and no force flag, return an error
    if (fs.existsSync(filePath) && req.query.force === undefined) {
      res.status(400);
      res.json({message: `File ${req.body.name} already exists. Add flag force to your query to overwrite it.`});
      return;
    }

    if (req.body.path.includes("/")) {
      const err = fileService.createFolderTree(filePath);
      if (err) {
        console.log(err);
        res.status(400);
        res.json({message: `Can't create folder tree on server. Check write permissions.`});
        return;
      }
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
      dbService.addSchema(schema as Schema, filePath);
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

/**
 * Use an api point: POST /api/<package>.<proto service>/<method>
 * @param req
 * @param res
 */
export const api = (req: Request, res: Response) => {
  const triplet = checkProtoMethod(req, res);
  if (triplet === undefined ) {
    return;
  }

  try {
  const proto = grpcService.load(triplet.package.filePath);
  const client = new (proto[triplet.package.name])[triplet.service.name]("localhost:50051", grpc.credentials.createInsecure());
  const answer = client[triplet.method.name]({name: "antoine"}, {}, (err: any, ans: any) => {
    if (err) {
      console.error(red(`${triplet.service.name}.${triplet.method.name}`, err.message));
      console.trace();
      return res.status(500).json({ code: err.code, message: err.message });
    }
    res.json(ans);
  });
} catch (error) {
    console.error(red(`${triplet.service.name}.${triplet.method.name}`, error.message));
    console.trace();
    res.status(500);
    res.json({message: `An error occured. ${error.message}`});
    return;
  }
};

/**
 * Get description for an api point: GET /api/<package>.<proto service>/<method>/
 * @param req
 * @param res
 */
export const describe = (req: Request, res: Response) => {

  const triplet = checkProtoMethod(req, res);
  if (triplet === undefined ) {
    return;
  }

  const input = dbService.getMessage(triplet.package.schema, triplet.method.input_type);
  const output = dbService.getMessage(triplet.package.schema, triplet.method.input_type);

  res.json({method: triplet.method, input: input, output: output});
};

/**
 * Procedure checking that package, service and method are correctly defined
 * (Assuming the standard package.service/method, case sensitive format)
 * @param req
 * @param res
 * @return In case of error, undefined, else the triplet package, service, method
 */
const checkProtoMethod = (req: Request, res: Response) => {
  const pack = dbService.getSchema(req.params.package);
  if ( pack === undefined) {
    res.status(404);
    res.json({message: `Package not found. This method is case sensitive.`});
    return undefined;
  }
  const service = dbService.getService(pack.schema, req.params.service);
  if ( service === undefined) {
    res.status(404);
    res.json({message: `Service not found. This method is case sensitive.`});
    return undefined;
  }
  const method = dbService.getMethod(pack.schema, service, req.params.method);
  if ( method === undefined) {
    res.status(404);
    res.json({message: `Method not found. This method is case sensitive.`});
    return undefined;
  }
  return {package: pack, service: service, method: method};
};