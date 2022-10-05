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
      // 1. Encontrar al usuario que se está tratando de autenticar
      user = await User.findOne({ where: { email: username } });
    } catch (error) {
      // 2. Hubo algun error al hacerlo? Retornemos ese error
      return done(error);
    }

    // 3. Pudiste encontrar un usuario? Si no pudiste, retornemos esa info
    if (!user) {
      return done(null, false, { message: "Credenciales incorrectas" });
    }

    // 4. Pudiste validar su contraseña? Si no pudiste, retornemos esa info
    if (password !== user.password) {
      return done(null, false, { message: "Credenciales incorrectas" });
    }

    // 5. Este usuario es quien dice ser. Vamos a autenticar su acceso :)
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
  }),
);

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
  res.redirect("/admin");
});

// app.get("/admin", function (req, res) {
//   if (req.isAuthenticated()) {
//     res.send(`Te damos la bienvenida, ${req.user.firstname}!!`);
//   } else {
//     res.redirect("/login");
//   }
// });

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
