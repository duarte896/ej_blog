const express = require("express");
const publicRouter = express.Router();
const articleController = require("../controllers/articleController");
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");
const passport = require("passport");
const loggedUserRedirect = require("../middlewares/loggedUserRedirect");
const { Article, User } = require("../models");

// Rutas Públicas:
publicRouter.get("/", pagesController.showHome);

publicRouter.get("/articles/json", pagesController.showJson);

publicRouter.get("/articles/:id", articleController.show);

publicRouter.get("/register", loggedUserRedirect, userController.show);

publicRouter.post("/register", userController.create);

publicRouter.get("/login", loggedUserRedirect, userController.showLogin);

publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
    // failureFlash: true,
  }),
);

publicRouter.get("/logout", userController.logout);

module.exports = publicRouter;
