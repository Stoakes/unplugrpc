/**
 * Operations of the infile database
 */

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
import { DB_PATH } from "../config/config";
import { Schema, StoredSchema, Service, Method } from "../types/types";
/**
 * Return  a db connection from a path file.
 * @param {*} path
 */
export const openDb = () => {
    const adapter = new FileSync(DB_PATH);
    const db = low(adapter);

    return db;
};

/**
 * Add a schema to the database
 * @param schema
 */
export const addSchema = (schema: Schema, filePath: string) => {
    const db = openDb();
    const pack = db.get("packages").find({name: schema.package}).value();

    if (pack !== undefined) {
        console.log(`Package ${schema.package} already exists`);
    } else {
        db.get("packages").push({name: schema.package, filePath: filePath, schema: schema}).write();
    }
};

/**
 * Get a schema from the database
 * @param schema
 */
export const getSchema = (name: string): StoredSchema => {
    const db = openDb();
    return db.get("packages").find({name: name}).value();
};

/**
 * Get a service from the database
 * @param schema
 * @param service
 */
export const getService = (schema: Schema, service: string): Service => {
    const db = openDb();

    return db.get("packages")
    .find({name: schema.package})
    .get("schema.services")
    .find({name: service})
    .value();
};

/**
 * Get a method from the database
 * @param schema
 * @param service
 */
export const getMethod = (schema: Schema, service: Service, method: string): Method => {
    const db = openDb();

    return db.get("packages")
    .find({name: schema.package})
    .get("schema.services")
    .find({name: service.name})
    .get("methods")
    .find({name: method})
    .value();
};

/**
 * Get a message from the database
 * @param schema
 * @param service
 */
export const getMessage = (schema: Schema, message: string): Method => {
    const db = openDb();

    return db.get("packages")
    .find({name: schema.package})
    .get("schema.messages")
    .find({name: message})
    .value();
};

/**
 * Find something, somewhere
 * @param name
 */
export const find = (query: Object): any => {
    const db = openDb();
    return db.get("packages").find(query).value();
};

/**
 * get a collection
 * @param name
 */
export const get = (collection: string): any => {
    const db = openDb();
    return db.get(collection);
};