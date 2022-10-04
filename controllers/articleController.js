const { Article, User, Comment } = require("../models");
// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  //get article by id
  {
    const article = await Article.findByPk(req.params.id, { include: [User, Comment] });
    // const user = await User.findByPk(article.userId);
    const comments = await Comment.findAll({ where: { articleId: req.params.id } });
    //console.log(comments);
    // console.log(article.createdAt);
    res.render("articles", {
      article,
      // user,
      // comments,
    });
  }
}

// Show the form for creating a new resource
async function create(req, res) {
  const userCreated = await User.create({
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
  });

  await Article.create({
    title: req.body.titulo,
    content: req.body.conteindo,
    userId: userCreated.id,
  });

  //Falta que el id del usuario quede en el articulo...
  res.redirect("/admin");
}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({
    where: { id: req.params.id },
  });
  res.redirect("/admin");
}

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
