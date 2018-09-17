import fs from "fs";
import path from "path";

import yargs from "yargs";
import newApp from "./app";
import { DB_PATH, PROTO_FOLDER } from "./config/config";
import { isPackagesCollectionEmpty } from "./services/appService";

const argv = yargs
  .usage("Usage: $0 [options]")
  .help("?")
  .alias("?", "help")
  .alias("?", "h")

  .default("port", process.env.PORT || 8000)
  .describe("port", "The port to serve UI & gateway on")
  .alias("port", "p")

  .describe("I", "Path to resolve imports from (ignored)")
  .alias("I", "include")

  .describe("ca", "SSL CA cert for gRPC (ignored)")
  .describe("key", "SSL client key for gRPC (ignored)")
  .describe("cert", "SSL client certificate for gRPC (ignored)")

  .boolean("quiet")
  .describe("quiet", "Suppress logs")
  .alias("quiet", "q")

  .boolean("cors")
  .describe("cors", "Allow CORS")

  .boolean("load-proto")
  .describe(
    "load-proto",
    `Load database with proto files stored in ${PROTO_FOLDER}.
    Existing protobuf schemas will be erased.`
  )
  .alias("load-proto", "lp")

  .boolean("load-once")
  .describe(
    "load-once",
    `If database is empty, load it with proto files stored in ${PROTO_FOLDER}.`
  )
  .alias("load-once", "lo").argv;

let dbCreated = false;

/* Check database existence and create it if it doesn't.
 * One way to check if database is correctly setup: GET /hosts should return [] ({} otherwise). */
if (!fs.existsSync(DB_PATH)) {
  if (fs.existsSync(path.join(path.dirname(DB_PATH), "db.json.dist"))) {
    try {
      fs.copyFileSync(
        path.join(path.dirname(DB_PATH), "db.json.dist"),
        DB_PATH
      );
      dbCreated = true;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Database not available and can not be created.");
  }
}

const loadProto =
  argv["load-proto"] || (argv["load-once"] && isPackagesCollectionEmpty());
const app = newApp(argv.cors, loadProto);

const server = app.listen(argv.port, () => {
  if (!argv.quiet) {
    console.log(`Listening on http://localhost:${argv.port}`);
  }
});

export default server;
