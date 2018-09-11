/**
 * All route to CRUD on protofiles.
 */
import * as async from "async";
import red from "chalk";
import { Request, Response } from "express";
import * as fs from "fs";
import * as grpc from "grpc";
import * as path from "path";

import { PROTO_FOLDER } from "../config/config";
import * as dbService from "../services/dbService";
import * as fileService from "../services/fileService";
import * as grpcService from "../services/grpcService";
import { Schema } from "../types/types";

/**
 * Add a new protofile to the protofile folder which can then be loaded on request
 * Schema of the file will be stored in DB
 *
 * @param req HTTP request
 * @param res HTTP response
 */
export const add = (req: Request, res: Response) => {
  req
    .checkBody(
      "name",
      "Name should only contain alphanumeric characters and dots"
    )
    .matches("^[0-9a-zA-Z-\\.]{0,40}$", "i");
  req.checkBody("path", "Path should not be empty").notEmpty();
  req.checkBody("path", "Path should end with .proto").matches("^.*\\.proto$");
  req
    //  tslint:disable-next-line
    .checkBody(
      "path",
      "Path should be between 7 and 63 characters long, only contain alphanumeric characters, dots dashs underscores and slashes characters"
    )
    .matches("^[0-9a-zA-Z.-/_]{7,63}$");
  req.checkBody("proto", "Content of the protofile not be blank").notEmpty();
  req
    .checkBody(
      "proto",
      "Content of the protofile should be at least 20 characters long"
    )
    .isLength({ min: 20 });

  const errors = req.validationErrors() as any[];
  if (errors) {
    res.status(400).json({ level: `error`, message: errors[0].msg });
    return;
  }

  const filePath = path.join(PROTO_FOLDER, req.body.path);

  req.body.name =
    req.body.name === undefined ||
    req.body.name === "" ||
    req.body.name === "undefined"
      ? path.basename(filePath)
      : req.body.name;
  // If file already exists and no force flag, return an error
  if (fs.existsSync(filePath) && req.query.force === undefined) {
    res.status(400).json({
      level: `error`,
      message: `File ${
        req.body.name
      } already exists. Add flag force to your query to overwrite it.`
    });
    return;
  }

  if (req.body.path.includes("/")) {
    const err = fileService.createFolderTree(filePath);
    if (err) {
      console.log(err);
      res.status(400).json({
        level: `error`,
        message: `Can't create folder tree on server. Check write permissions.`
      });
      return;
    }
  }

  fs.writeFile(filePath, req.body.proto, err => {
    if (err) {
      res.status(400).json({
        level: `error`,
        message: `Can't write file on server. Check write permissions.`
      });
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
      fs.unlink(filePath, error => {
        if (error) {
          console.log(error);
        }
      });
      res.status(400).json({
        level: `error`,
        message: `Error while loading file: ${error.message}`
      });
      return;
    }
    res.status(200).json({ level: `success`, message: `File loaded`, schema });
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
  const protos = db.get("packages").map((item: any) => {
    return {
      filePath: item.filePath.replace(PROTO_FOLDER, ""),
      name: item.name
    };
  });
  res.send(protos);
};

export const refresh = (req: Request, res: Response) => {
  const db = dbService.openDb();
  const protoFiles = fileService.getProtoFromFolder(PROTO_FOLDER);
  for (let i = 0, len = protoFiles.length; i < len; i++) {
    db.get("routes")
      .push({
        filename: protoFiles[i],
        schema: grpcService.protofileToSchema(
          `${PROTO_FOLDER}/${protoFiles[i]}`
        )
      })
      .write();
  }

  res.send(db.get("routes"));
};

/**
 * Call a grpc method from a dynamically loaded description.
 * @param req
 * @param res
 */
export const api = (req: Request, res: Response) => {
  const triplet = checkProtoMethod(req, res);
  if (triplet === undefined) {
    return;
  }
  req.checkHeaders("x-host", "Host should not be empty").notEmpty();
  req.checkBody("message", "Payload is not valid JSON").isJSON();
  const errors = req.validationErrors() as any[];
  if (errors) {
    res.status(400).json({ level: `error`, message: errors[0].msg });
    return;
  }

  try {
    const proto = grpcService.load(triplet.package.filePath);
    const client = new proto[triplet.package.name][triplet.service.name](
      req.get("x-host"),
      grpc.credentials.createInsecure()
    );

    // Simple RPC
    if (!triplet.method.server_streaming && !triplet.method.client_streaming) {
      client[triplet.method.name](
        JSON.parse(req.body.message),
        {},
        (err: any, answer: any) => {
          if (err) {
            console.error(
              red(`${triplet.service.name}.${triplet.method.name}`, err.message)
            );
            console.trace();
            return res
              .status(400)
              .json({ code: err.code, message: err.message });
          }
          res.json(answer);
        }
      );
      return;
    }

    // Server streaming only
    if (triplet.method.server_streaming && !triplet.method.client_streaming) {
      async.series([
        () => {
          let index = 0; // Thread-safe because of js one thread approach
          const call = client[triplet.method.name](
            JSON.parse(req.body.message)
          );
          res.write("[");
          call.on("data", (data: any) => {
            const delimiter = index !== 0 ? "," : "";
            index++;
            res.write(`${delimiter}${JSON.stringify(data)}`);
          });
          call.on("end", () => {
            res.write("]");
            res.end();
          });
        }
      ]);
      return;
    }

    // Client streaming only
    if (!triplet.method.server_streaming && triplet.method.client_streaming) {
      const call = client[triplet.method.name]((err: any, answer: any) => {
        if (err) {
          return res.status(400).json({ code: err.code, message: err.message });
        }
        res.json(answer);
        return;
      });

      // Items have been sent in an array (stream representation), and are send independantly.
      const items = JSON.parse(req.body.message);
      async.series(
        items.map((item: any) => {
          return (callback: any) => {
            call.write(item);
            callback();
          };
        }),
        () => {
          call.end();
        }
      );
    }

    // Bi-directionnal
    if (triplet.method.server_streaming && triplet.method.client_streaming) {
      return res.status(400).json({
        level: `error`,
        message: `Bi-directionnal streaming is not supported yet.`
      });
    }
  } catch (error) {
    console.error(
      red(`${triplet.service.name}.${triplet.method.name}`, error.message)
    );
    console.trace();
    res
      .status(400)
      .json({ level: `error`, message: `An error occured. ${error.message}` });
    return;
  }
};

/**
 * Get description for an api point: GET /<package>.<proto service>/<method>/
 * @param req
 * @param res
 */
export const describe = (req: Request, res: Response) => {
  const triplet = checkProtoMethod(req, res);
  if (triplet === undefined) {
    return;
  }

  const input = dbService.getMessage(
    triplet.package.schema,
    triplet.method.input_type
  );
  const output = dbService.getMessage(
    triplet.package.schema,
    triplet.method.input_type
  );

  res.json({ method: triplet.method, input, output });
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
  if (pack === undefined) {
    res.status(404);
    res.json({
      level: `error`,
      message: `Package not found. This method is case sensitive.`
    });
    return undefined;
  }
  const service = dbService.getService(pack.schema, req.params.service);
  if (service === undefined) {
    res.status(404);
    res.json({
      level: `error`,
      message: `Service not found. This method is case sensitive.`
    });
    return undefined;
  }
  const method = dbService.getMethod(pack.schema, service, req.params.method);
  if (method === undefined) {
    res.status(404);
    res.json({
      level: `error`,
      message: `Method not found. This method is case sensitive.`
    });
    return undefined;
  }
  return { package: pack, service, method };
};
