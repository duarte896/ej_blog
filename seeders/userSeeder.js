const { faker } = require("@faker-js/faker");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const users = [];

  users.push({
    firstname: "prueba",
    lastname: "prueba",
    email: "prueba@prueba",
    password: "prueba",
  });

  for (let i = 0; i < 10; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: "prueba",
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
