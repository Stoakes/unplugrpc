import request from "supertest";

import newApp from "../src/app";
import * as helper from "./testHelper";

const app = newApp(false);

test("good", done => {
  done();
});
