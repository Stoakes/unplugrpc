/**
 * CRUD on hosts
 * A host is
 */
import { Request, Response } from "express";
import { body } from "express-validator/check";

import * as dbService from "../services/dbService";

/**
 * Add an host to the database
 * @param req
 * @param res
 */
export const add = (req: Request, res: Response) => {
    body("port").toInt();
    body("port").isPort();
    req.checkBody("host", "Host can not be empty").notEmpty();

    const errors = req.validationErrors() as any[];
    if (errors) {
      res.status(400);
      res.json({level: `error`, message: errors[0].msg});
      return;
    }

    if (req.body.name === undefined || req.body.name === "") {
        req.body.name =  `${req.body.host}:${req.body.port}`;
    }
    try {
        const host = dbService.get("hosts")
        .find({host: req.body.host, port: req.body.port})
        .value();

        if (host === undefined) {
            dbService.get("hosts")
            .push({name: req.body.name, host: req.body.host, port: req.body.port})
            .write();
            res.json({level: `success`, message: `Host added to the list`});
        } else {
            res.status(400);
            res.json({level: `error`, message: `An host with similar host and port already exists`});
        }

    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({level: `error`, message: `An error occured. ${error.message}`});
    }
};

/**
 * Update an existing host
 * Note: an host is not described by an id, but by the couple host, port.
 * @param req
 * @param res
 */
export const update = (req: Request, res: Response) => {
    body("port").toInt();
    body("port").isPort();
    req.checkBody("host", "Host can not be empty").notEmpty();

    if (req.body.name === undefined || req.body.name === "") {
        req.body.name =  `${req.body.host}:${req.body.port}`;
    }
    try {
        const host = dbService.get("hosts")
        .find({host: req.params.host, port: req.params.port})
        .value();

        if (host === undefined) {
            res.status(404);
            res.json({level: `error`, message: `Host does not exist`});
        } else {
            dbService.get("hosts")
            .find({host: req.params.host, port: req.params.port})
            .assign({name: req.body.name, host: req.body.host, port: req.body.port})
            .write();
            res.json({level: `success`, message: `Host updated`});
        }
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({level: `error`, message: `An error occured. ${error.message}`});
    }
};

/**
 * Delete an existing host
 * Note: an host is not described by an id, but by the couple host, port.
 * @param req
 * @param res
 */
export const remove = (req: Request, res: Response) => {
    try {
        const host = dbService.get("hosts")
        .find({host: req.params.host, port: req.params.port})
        .value();

        if (host === undefined) {
            res.status(404);
            res.json({level: `error`, message: `Host does not exist`});
        } else {
            dbService.get("hosts")
            .remove({host: req.params.host, port: req.params.port})
            .write();
            res.json({level: `success`, message: `Host deleted`});
        }
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({level: `error`, message: `An error occured. ${error.message}`});
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