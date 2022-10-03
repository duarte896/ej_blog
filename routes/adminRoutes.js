const express = require("express");
const adminRouter = express.Router();
const pagesControllers = require('../controllers/pagesController')
// Rutas del Admin:
// ...
adminRouter.get("/", pagesControllers.showAdmin);

module.exports = adminRouter;
