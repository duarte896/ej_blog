const { Article, User, Comment } = require("../models");
const formidable = require("formidable");
// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  //get article by id

  const article = await Article.findByPk(req.params.id, { include: [User, Comment] });

  const comments = await Comment.findAll({ where: { articleId: req.params.id }, include: User });

  // console.log(article.createdAt);
  res.render("articles", {
    article,
    // user,
    comments,
    req,
  });
}

// Show the form for creating a new resource
async function create(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    await Article.create({
      title: fields.title,
      content: fields.content,
      userId: req.user.id,
      image: files.image.newFilename,
    });
  });
  res.redirect("/admin");
}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {
  await Article.update(
    {
      title: req.body.titulo,
      content: req.body.conteindo,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );

  const articleEdit = await Article.findByPk(req.params.id);

  await User.update(
    {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
    },
    {
      where: {
        id: articleEdit.userId,
      },
    },
  );

  res.redirect("/admin");
}

// Update the specified resource in storage.
async function createArticle(req, res) {
  return res.render("createArticle");
}

async function editArticle(req, res) {
  const resultsArt = await Article.findByPk(req.params.id, { include: User });

  res.render("editArticle", {
    resultsArt,
  });
}
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
  createArticle,
  store,
  edit,
  destroy,
  editArticle,
};
