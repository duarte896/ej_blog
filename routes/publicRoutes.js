const express = require("express");
const publicRouter = express.Router();
const { Article } = require("../models");

// Rutas Públicas:
publicRouter.get("/", async (req, res) => {
  const allArticles = await Article.findAll()
  res.render("home", {allArticles});
  console.log(allArticles[1].updatedAt)
});

publicRouter.get("/articles", (req, res) => {
  res.render("articles");
});

publicRouter.get("/admin", (req, res) => {
  res.render("admin");
});

module.exports = publicRouter;
