require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const { User } = require("./models/index");
const bcrypt = require("bcryptjs");
const app = express();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "algunTextoSecreto",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (username, password, done) {
    let user;

    try {
      user = await User.findOne({ where: { email: username } });
    } catch (error) {
      return done(error);
    }
    if (!user) {
      return done(null, false, { message: "Credenciales incorrectas" });
    }
    const chequeoPassword = bcrypt.compare(password, user.password);
    if (!chequeoPassword) {
      return done(null, false, { message: "Credenciales incorrectas" });
    }
    return done(null, user);
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    let user = await User.findByPk(id);
    if (!user) {
      return done(new Error("user not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

routes(app);

dbInitialSetup();

app.get("/login", function (req, res) {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);
// const usuario = await User.findOne({ where: { email: req.body.email } });
// const passwordIngresado = req.body.password;
// const hashAlmacenado = usuario.password;
// const chequeoPassword = bcrypt.compare(passwordIngresado, hashAlmacenado);
// if (chequeoPassword === true) {
//   res.redirect("/admin");
// } else {
//   res.redirect("/login");
// }

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  if (newUser.id !== null) {
    req.login(newUser, () => {
      res.redirect("/admin");
    });
  } else {
    res.redirect("/register");
  }
});

app.get("/logout", function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
