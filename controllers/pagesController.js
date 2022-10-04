const { Article, User } = require("../models");

async function showHome(req, res) {
  const allArticles = await Article.findAll({ include: User });
  res.render("home", { allArticles });
}

async function showJson(req, res) {
  const allArticles = await Article.findAll({ include: User });
  res.json(allArticles);
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function showAdmin(req, res) {
  const allArticles = await Article.findAll({ include: User });
  res.render("admin", { allArticles });
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showJson,
  showContact,
  showAboutUs,
  showAdmin,
};
