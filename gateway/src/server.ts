import app from "./app";
import yargs from "yargs";
import cors from "cors";

const argv = yargs.usage("Usage: $0 [options]")
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
  .describe("cors", "Allow CORS")
  .argv;

if(argv.cors){
    console.log(`Enabling CORS`)
    app.use(cors())
}

const server = app.listen(argv.port, () => {
  if (!argv.quiet) {
    console.log(`Listening on http://localhost:${argv.port}`);
    console.log(`Press CTRL+C to stop.`);
  }
});

export default server;
