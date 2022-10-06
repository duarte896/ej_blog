// Middleware para asegurarse que el usuario está autenticado:
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    res.redirect("/login");
  }
}

// Middleware para redirigir al usuario que ya está autenticado:
function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    return next();
  }
}

// Middleware para que el objeto user quede disponible en todas las vistas:
function makeUserAvailableInViews(req, res, next) {
  res.locals.user = req.user;
  next();
}

module.exports = {
  makeUserAvailableInViews,
  redirectIfAuthenticated,
  ensureAuthenticated,
};
