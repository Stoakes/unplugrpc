import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import expressValidator from "express-validator";
import path from "path";

import * as dashboardController from "./controllers/dashboard";
import * as hostsController from "./controllers/hosts";
import * as packagesController from "./controllers/packages";
import * as protoController from "./controllers/proto";

const newApp = (corsEnabled: boolean): express.Express => {
    const app = express();

    if (corsEnabled) {
        console.log(`Enabling CORS`);
        app.use(cors());
    }
    // Handlers
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());

    // Routes
    app.get("/dashboard", dashboardController.index);
    app.post("/protos", protoController.add);
    // These are the core methods, they have no side effects on the gateway state.
    app.post("/api/:package.:service/:method/", protoController.api);
    app.get("/api/:package.:service/:method/", protoController.describe);
    // CRUD on app objects
    app.get("/hosts", hostsController.list);
    app.post("/hosts", hostsController.add);
    app.put("/hosts/:host\::port", hostsController.update);
    app.delete("/hosts/:host\::port", hostsController.remove);
    app.get("/packages", packagesController.list);
    app.get("/packages/:name", packagesController.show);
    // Static files
    app.use("/", express.static(path.join(__dirname, "/../build-ui")));

    return app;
};

export default newApp;