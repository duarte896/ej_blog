const express = require("express");
const adminRouter = express.Router();
const pagesControllers = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const { Article, User } = require("../models");
// Rutas del Admin:
// ...
adminRouter.use(ensureAuthenticated);
adminRouter.get("/admin", pagesControllers.showAdmin);

adminRouter.get("/editar/:id", articleController.editArticle);

adminRouter.get("/eliminar/:id", articleController.destroy);

adminRouter.post("/articles/crear", articleController.create);

adminRouter.post("/articles/:id", commentController.create);

adminRouter.post("/editar/:id", articleController.edit);

adminRouter.get("/articles/crear", articleController.createArticle);

module.exports = adminRouter;
