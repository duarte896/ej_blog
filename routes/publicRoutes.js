const express = require("express");
const publicRouter = express.Router();

// Rutas Públicas:
publicRouter.get("/", (req, res) => {
  res.render("home");
});

publicRouter.get("/articles", (req, res) => {
  res.render("articles");
});

publicRouter.get("/admin", (req, res) => {
  res.render("admin");
});

module.exports = publicRouter;
