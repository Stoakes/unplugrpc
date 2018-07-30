import express from "express";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import path from "path";

import * as dashboardController from "./controllers/dashboard";
import * as protoController from "./controllers/proto";

const app = express();

// Handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// Routes
app.get("/dashboard", dashboardController.index);
app.post("/new", protoController.add);
app.use("/", express.static(path.join(__dirname, "/../build-ui")));

export default app;