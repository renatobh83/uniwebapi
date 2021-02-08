const express = require("express");
const path = require("path");
const cors = require("cors");
const routerController = require("./routes/routerController");

class AppController {

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: ["*"],
        credentials: true,
      })
      );
  }
  routes() {
    routerController(this.express);
  }
}
module.exports = new AppController().express;