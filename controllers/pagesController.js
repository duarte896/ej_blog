const { Article, User } = require("../models");
const { format } = require("date-fns");
const spanishLocale = require("date-fns/locale/es");

const { application } = require("express");
async function showHome(req, res) {
  const allArticles = await Article.findAll({ include: User });
  res.render("home", { allArticles, req });
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

  res.render("admin", { allArticles, req, format, spanishLocale });
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
