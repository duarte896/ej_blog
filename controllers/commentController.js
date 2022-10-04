const { Article, User, Comment } = require("../models");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  console.log(req.params.id);
  const userCreated = await User.create({
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
  });

  await Comment.create({
    content: req.body.content,
    userId: userCreated.id,
    articleId: req.params.id,
  });

  //Falta que el id del usuario quede en el articulo...
  res.redirect(`/articles/${req.params.id}`);
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
};
