const express = require("express");
const adminRouter = express.Router();
const pagesControllers = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const { Article, User, Role } = require("../models");
const roleAuthentication = require("../middlewares/rolesAuthentication");

// Rutas del Admin:
// ...
adminRouter.use(ensureAuthenticated);
adminRouter.get("/", pagesControllers.showAdmin);

adminRouter.get(
  "/edit/:id",
  roleAuthentication.admin,
  roleAuthentication.writer,
  articleController.editArticle,
);

adminRouter.get("/destroy/:id", roleAuthentication.admin, articleController.destroy);

adminRouter.post("/articles/crear", roleAuthentication.admin, articleController.create);

adminRouter.post("/articles/:id", commentController.create);

adminRouter.post("/edit/:id", roleAuthentication.admin, articleController.edit);

adminRouter.get("/articles/crear", roleAuthentication.admin, articleController.createArticle);

module.exports = adminRouter;
