// Importing required modules
const sequelize = require("../config/connection"); // Importing the Sequelize connection
const { User } = require("../models");             // Importing the User model

// Array of user data to be seeded
const users = [
  {
    firstName: "First1",
    lastName: "Last1",
    username: "User1",
    password: "User1",
  },
  {
    firstName: "First2",
    lastName: "Last2",
    username: "User2",
    password: "User2",
  },
  {
    firstName: "First3",
    lastName: "Last3",
    username: "User3",
    password: "User3",
  },
];

// Function to seed users into the database
const seedUsers = async () => {
  try {
    await sequelize.sync({ force: true }); // Sync the database, force true will drop existing tables
    await User.bulkCreate(users, {         // Bulk create users in the database
      individualHooks: true,               // Use individual hooks for each user creation
    });
    console.log("Users seeded successfully!"); // Log success message
  } catch (err) {
    console.error("Error seeding users:", err); // Log error message if seeding fails
  }
};

// Export the seedUsers function
module.exports = seedUsers;
