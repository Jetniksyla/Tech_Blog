// User seed

const sequelize = require("../config/connection");
const { User } = require("../models");

const users = [
  {
    username: "User1",
    password: "User1",
  },
  {
    username: "User2",
    password: "User2",
  },
  {
    username: "User3",
    password: "User3",
  },
];

const seedUsers = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users, {
      individualHooks: true,
    });
    console.log("Users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};

module.exports = seedUsers;
