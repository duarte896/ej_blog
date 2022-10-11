const express = require("express");
const adminRouter = express.Router();
const apiController = require("../controllers/apiController");

adminRouter.get("/api/articles", apiController.showAllArticles);
adminRouter.get("/api/articles/:id", apiController.showArticlesByAuthor);

module.exports = adminRouter;
