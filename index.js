const winston = require("winston");
const express = require("express");

var app = express();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.port || 3000;
app.listen(port, () =>
  winston.info("Listening at port http://localhost:3000...")
);
