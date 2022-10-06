require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const { User } = require("./models/index");
const app = express();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ensureAuthenticated = require("./middlewares/ensureAuthenticated");
const bcrypt = require("bcrypt");

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

    if (password !== user.password) {
      return done(null, false, { message: "Credenciales incorrectas" });
    }

    return done(null, user);
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user); // req.user
    })
    .catch(() => {
      done(error, user);
    });
});

dbInitialSetup();

app.get("/login", function (req, res) {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  }),
);

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const passwordHasheada = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: passwordHasheada,
  });
  res.redirect("/admin");
});

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
