const fs = require("fs");
const path = require("path");
const express = require("express");
const expressLogging = require("express-logging");
const logger = require("logops");
const compression = require("compression");

logger.format = logger.formatters.dev;

const app = express();
app.use(compression());
app.use(expressLogging(logger));
app.use(express.static(path.resolve(__dirname, "dist")));

app.get("*", function(req, res) {
  const html = fs.readFileSync(
    path.resolve(__dirname, "./dist/index.html"),
    "utf-8"
  );
  res.send(html);
});

app.listen(8085);
console.log("success listen…………8085");
