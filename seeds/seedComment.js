// Importing required modules
const sequelize = require("../config/connection"); // Importing the Sequelize connection
const { Comment } = require("../models");          // Importing the Comment model

// Array of comment data to be seeded
const comments = [
  {
    body: "Amazing!",
    blogId: 1,
    userId: 1,
  },
  {
    body: "Cool!",
    blogId: 3,
    userId: 2,
  },
  {
    body: "Agree!",
    blogId: 4,
    userId: 1,
  },
  {
    body: "Helps a lot!",
    blogId: 2,
    userId: 3,
  },
];

// Function to seed comments into the database
const seedComments = async () => {
  try {
    await Comment.bulkCreate(comments); // Bulk create comments in the database
    console.log("Comments seeded successfully!"); // Log success message
  } catch (err) {
    console.error("Error seeding comments:", err); // Log error message if seeding fails
  }
};

// Export the seedComments function
module.exports = seedComments;
