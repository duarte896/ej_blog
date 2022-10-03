const express = require("express");
const publicRouter = express.Router();
const articleController = require("../controllers/articleController");
const pagesController = require("../controllers/pagesController");
// Rutas Públicas:
publicRouter.get("/", pagesController.showHome);

publicRouter.get("/articles/json", pagesController.showJson);

publicRouter.get("/articles/:id", articleController.show);

module.exports = publicRouter;
