const express = require("express");
const publicRouter = express.Router();
const articleController = require("../controllers/articleController");

// Rutas Públicas:
publicRouter.get("/", (req, res) => {
  res.render("home");
});

publicRouter.get("/articles/:id", articleController.show);

publicRouter.get("/admin", (req, res) => {
  res.render("admin");
});

module.exports = publicRouter;
