/**
 * Operations of the infile database
 */

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
import { DB_PATH } from "../config/config";
/**
 * Return  a db connection from a path file.
 * @param {*} path
 */
export const openDb = () => {
    const adapter = new FileSync(DB_PATH);
    const db = low(adapter);

    return db;
};
