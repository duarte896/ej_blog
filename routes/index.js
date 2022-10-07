const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");
const makeUserAvailable = require("../middlewares/makeUserAvailable");

module.exports = (app) => {
  app.use(makeUserAvailable);

  app.use(publicRoutes);
  app.use("/admin", adminRoutes);
};
