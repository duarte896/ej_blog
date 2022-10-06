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

adminRouter.get("/admin/editar/:id", articleController.editArticle);

adminRouter.get("/admin/eliminar/:id", articleController.destroy);

adminRouter.post("/admin/articles/crear", articleController.create);

adminRouter.post("/admin/articles/:id", commentController.create);

adminRouter.post("/admin/editar/:id", articleController.edit);

adminRouter.get("/admin/articles/crear", articleController.createArticle);

module.exports = adminRouter;
