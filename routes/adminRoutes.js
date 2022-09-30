const express = require("express");
const adminRouter = express.Router();
// const adminControllers = 
// Rutas del Admin:
// ...
adminRouter.get("/", (req, res) => {
    res.render("admin");
  });

module.exports = adminRouter;
