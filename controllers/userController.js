const { User } = require("../models");
const { faker } = require("@faker-js/faker");
faker.locale = "es";

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const userName = req.flash("user");
  res.render("register", { userName });
}

async function showLogin(req, res) {
  res.render("login");
}

// Show the form for creating a new resource
async function create(req, res) {
  const userAuthentication = await User.findOne({
    where: { email: req.body.email },
  });
  if (!userAuthentication) {
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      roleId: faker.datatype.number({
        min: 1,
        max: 4,
      }),
    });

    if (newUser) {
      req.login(newUser, () => {
        res.redirect("/admin");
      });
    }
  } else {
    req.flash("user", "Este usuario ya existe.");
    res.redirect("back");
  }
}

async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  showLogin,
  logout,
};
