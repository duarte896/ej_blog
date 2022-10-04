const express = require("express");
const publicRouter = express.Router();
const articleController = require("../controllers/articleController");
const pagesController = require('../controllers/pagesController')
const { Article, User } = require("../models");
// Rutas Públicas:
publicRouter.get("/", pagesController.showHome);

publicRouter.get("/articles/crear", function (req, res) {
  res.render("createArticle")
});

publicRouter.get("/articles/json", pagesController.showJson);

publicRouter.post("/articles/crear", articleController.create);

publicRouter.get("/articles/:id", articleController.show);

publicRouter.get("/eliminar/:id", articleController.destroy);

publicRouter.get('/editar/:id', async function(req, res){
  const resultsArt = await Article.findByPk(req.params.id, {include: User});
  res.render('editArticle',{
    resultsArt,
  })
});
publicRouter.post('/editar/:id', articleController.edit)
module.exports = publicRouter;
