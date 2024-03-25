// Importing required modules
const sequelize = require("../config/connection"); // Importing the Sequelize connection
const { Blog } = require("../models");             // Importing the Blog model

// Array of blog data to be seeded
const blogs = [
  {
    title: "Title1",
    content: "Content 1",
    userId: 1,
  },
  {
    title: "Title2",
    content: "Content 2",
    userId: 1,
  },
  {
    title: "Title3",
    content: "Content 3",
    userId: 2,
  },
  {
    title: "Title4",
    content: "Content 4",
    userId: 3,
  },
];

// Function to seed blogs into the database
const seedBlogs = async () => {
  try {
    await Blog.bulkCreate(blogs); // Bulk create blogs in the database
    console.log("Blogs seeded successfully!"); // Log success message
  } catch (err) {
    console.error("Error seeding blogs:", err); // Log error message if seeding fails
  }
};

// Export the seedBlogs function
module.exports = seedBlogs;
