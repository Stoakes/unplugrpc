import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import expressValidator from "express-validator";
import path from "path";

import * as hostsController from "./controllers/hosts";
import * as packagesController from "./controllers/packages";
import * as protoController from "./controllers/proto";
import { refreshDb } from "./services/appService";

const newApp = (
  corsEnabled: boolean,
  loadProto: boolean = false
): express.Express => {
  const app = express();

  if (corsEnabled) {
    console.log(`Enabling CORS`);
    app.use(cors());
  }

  if (loadProto) {
    console.log(`Refreshing protobuf schemas`);
    refreshDb();
  }

  // Handlers
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());

  // Routes
  app.post("/:package.:service/:method/", protoController.api);
  app.get("/:package.:service/:method/", protoController.describe);
  app.get("/hosts", hostsController.list);
  app.post("/hosts", hostsController.add);
  app.put("/hosts/:host::port", hostsController.update);
  app.delete("/hosts/:host::port", hostsController.remove);
  app.get("/packages", packagesController.list);
  app.get("/packages/:name", packagesController.show);
  app.get("/protos", protoController.list);
  app.post("/protos", protoController.add);
  // Static files
  app.use("/", express.static(path.join(__dirname, "/../build-ui")));

  return app;
};

export default newApp;
