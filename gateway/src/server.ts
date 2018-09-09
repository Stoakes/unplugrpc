import fs from "fs";
import path from "path";

import yargs from "yargs";
import newApp from "./app";
import { DB_PATH } from "./config/config";

const argv = yargs
  .usage("Usage: $0 [options]")
  .help("?")
  .alias("?", "help")
  .alias("?", "h")

  .default("port", process.env.PORT || 8000)
  .describe("port", "The port to serve your JSON proxy on")
  .alias("port", "p")

  .describe("I", "Path to resolve imports from")
  .alias("I", "include")

  .describe("ca", "SSL CA cert for gRPC")
  .describe("key", "SSL client key for gRPC")
  .describe("cert", "SSL client certificate for gRPC")

  .boolean("quiet")
  .describe("quiet", "Suppress logs")
  .alias("quiet", "q")

  .boolean("cors")
  .describe("cors", "Allow CORS").argv;

const app = newApp(argv.cors);

/* Check database existence and create it if it doesn't.
 * One way to check if database is correctly setup: GET /hosts should return [] ({} otherwise). */
if (!fs.existsSync(DB_PATH)) {
  if (fs.existsSync(path.join(path.dirname(DB_PATH), "db.json.dist"))) {
    try {
      fs.copyFileSync(
        path.join(path.dirname(DB_PATH), "db.json.dist"),
        DB_PATH
      );
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Database not available and can not be created.");
  }
}

const server = app.listen(argv.port, () => {
  if (!argv.quiet) {
    console.log(`Listening on http://localhost:${argv.port}`);
    console.log(`Press CTRL+C to stop.`);
  }
});

export default server;
