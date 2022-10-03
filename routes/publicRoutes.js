const express = require("express");
const publicRouter = express.Router();
const articleController = require("../controllers/articleController");
const pagesController = require('../controllers/pagesController')
// Rutas Públicas:
publicRouter.get("/", pagesController.showHome);

publicRouter.get("/articles/crear", function (req, res) {
  res.render("createArticle")
});

publicRouter.post("/articles/crear", articleController.create);

publicRouter.get("/articles/:id", articleController.show);



module.exports = publicRouter;
