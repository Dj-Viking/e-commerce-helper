const express = require("express");
const routes = require("./routes")


module.exports = function() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routes);
  return app;
}