// Importing seed functions for users, blogs, and comments
const seedUsers = require("./seedUser");      // Importing seed function for users
const seedBlogs = require("./seedBlog");      // Importing seed function for blogs
const seedComments = require("./seedComment"); // Importing seed function for comments

// Function to seed all data
const seedAll = async () => {
  // Call each seed function sequentially
  await seedUsers();      // Seed users
  await seedBlogs();      // Seed blogs
  await seedComments();   // Seed comments
  console.log("All seed data inserted successfully!"); // Log success message
  process.exit(0);        // Exit process
};

// Call seedAll function to start seeding process
seedAll();
