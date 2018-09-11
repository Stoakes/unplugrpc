/**
 * File for API points about gRPC package
 */
import { Request, Response } from "express";

import { PROTO_FOLDER } from "../config/config";
import * as dbService from "../services/dbService";

/**
 * List every package stored in database
 * @param req
 * @param res
 */
export const list = (req: Request, res: Response) => {
  const packages = dbService.get("packages").value();
  if (packages === undefined) {
    res.json({});
    return;
  }
  res.json(
    packages.map((item: any) => {
      return { name: item.name };
    })
  );
};

/**
 * Show the details of a package.
 * This methods does not return the full package object, but only:
 *   - its attributes (PROTO_Folder truncated from filePath)
 *   - its services and their attributes
 * @param req
 * @param res
 */
export const show = (req: Request, res: Response) => {
  const pack = dbService
    .get("packages")
    .find({ name: req.params.name })
    .value();
  if (pack === undefined) {
    res.json({ level: `error`, message: `Package not found` });
    return;
  }
  res.json({
    ...pack,
    filePath: pack.filePath.replace(PROTO_FOLDER, ""),
    schema: {
      messages: pack.schema.messages,
      services: pack.schema.services
    }
  });
};
