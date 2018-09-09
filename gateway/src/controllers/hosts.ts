/**
 * CRUD on hosts
 * A host is a name (assumed resolvable or an ip) and a port
 */
import { Request, Response } from "express";
import * as dbService from "../services/dbService";

/**
 * Add an host to the database
 * @param req
 * @param res
 */
export const add = (req: Request, res: Response) => {
  req.checkBody("host", "Host can not be empty").notEmpty();
  req
    .checkBody("host", "Host is not recognized as valid host value")
    .matches(
      "^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])(\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]))*$"
    );
  req.checkBody("port", "Port can not be empty").notEmpty();
  req.checkBody("port", "Port is not recognized as valid port").isPort();

  const errors = req.validationErrors() as any[];
  if (errors) {
    res.status(400);
    res.json({ level: `error`, message: errors[0].msg });
    return;
  }

  req.body.port = parseInt(req.body.port, 10);
  if (req.body.name === undefined || req.body.name === "") {
    req.body.name = `${req.body.host}:${req.body.port}`;
  }
  try {
    const host = dbService
      .get("hosts")
      .find({ host: req.body.host, port: req.body.port })
      .value();

    if (host === undefined) {
      dbService
        .get("hosts")
        .push({ name: req.body.name, host: req.body.host, port: req.body.port })
        .write();
      res.json({ level: `success`, message: `Host added to the list` });
    } else {
      res.status(400);
      res.json({
        level: `error`,
        message: `An host with similar host and port already exists`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({ level: `error`, message: `An error occured. ${error.message}` });
  }
};

/**
 * Update an existing host
 * Note: an host is not described by an id, but by the couple host, port.
 * @param req
 * @param res
 */
export const update = (req: Request, res: Response) => {
  req.checkBody("host", "Host can not be empty").notEmpty();
  req
    .checkBody("host", "Host is not recognized as valid host value")
    .matches(
      "^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])(\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]))*$"
    );
  req.checkBody("port", "Port can not be empty").notEmpty();
  req.checkBody("port", "Port is not recognized as valid port").isPort();
  req
    .checkParams("port", "Port parameter is not recognized as valid port")
    .isPort(); // used as equivalent of isInt()

  const errors = req.validationErrors() as any[];
  if (errors) {
    res.status(400);
    res.json({ level: `error`, message: errors[0].msg });
    return;
  }

  req.body.port = parseInt(req.body.port, 10);
  req.params.port = parseInt(req.params.port, 10);

  try {
    const host = dbService
      .get("hosts")
      .find({ host: req.params.host, port: req.params.port })
      .value();

    if (host === undefined) {
      res.status(404);
      res.json({ level: `error`, message: `Host does not exist` });
      return;
    }
    if (
      (req.body.name === undefined || req.body.name === "") &&
      host.name === `${host.host}:${host.port}`
    ) {
      req.body.name = `${req.body.host}:${req.body.port}`;
    } else if (req.body.name === undefined || req.body.name === "") {
      req.body.name = host.name; // don't update name if it's not the default one
    }
    dbService
      .get("hosts")
      .find({ host: req.params.host, port: req.params.port })
      .assign({
        host: req.body.host,
        name: req.body.name,
        port: req.body.port
      })
      .write();
    res.json({ level: `success`, message: `Host updated` });
    return;
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({ level: `error`, message: `An error occured. ${error.message}` });
  }
};

/**
 * Delete an existing host
 * Note: an host is not described by an id, but by the couple host, port.
 * @param req
 * @param res
 */
export const remove = (req: Request, res: Response) => {
  req
    .checkParams("port", "Port parameter is not recognized as valid port")
    .isPort(); // used as equivalent of isInt()

  const errors = req.validationErrors() as any[];
  if (errors) {
    res.status(400);
    res.json({ level: `error`, message: errors[0].msg });
    return;
  }
  req.params.port = parseInt(req.params.port, 10);

  try {
    const host = dbService
      .get("hosts")
      .find({ host: req.params.host, port: req.params.port })
      .value();

    if (host === undefined) {
      res.status(404);
      res.json({ level: `error`, message: `Host does not exist` });
    } else {
      dbService
        .get("hosts")
        .remove({ host: req.params.host, port: req.params.port })
        .write();
      res.json({ level: `success`, message: `Host deleted` });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({ level: `error`, message: `An error occured. ${error.message}` });
  }
};

/**
 * Return the list of all host stored in the database.
 * @param req
 * @param res
 */
export const list = (req: Request, res: Response) => {
  const hosts = dbService.get("hosts").value();
  if (hosts === undefined) {
    res.json({});
    return;
  }
  res.json(hosts);
};
