const { Article, User } = require("../models");

async function showAllArticles(req, res) {
  const allArticles = await Article.findAll();
  res.json(allArticles);
}
async function showArticlesByAuthor(req, res) {
  //console.log(req.params.id);
  const user = await User.findByPk(req.params.id, { include: Article });
  res.json({
    firstname: user.firstname,
    lastname: user.lastname,
    articles: user.articles,
  });
}

module.exports = {
  showAllArticles,
  showArticlesByAuthor,
};
