// Blog seed

const sequelize = require("../config/connection");
const { Blog } = require("../models");

const blogs = [
  {
    title: "Title1",
    content: "Title 1",
    userId: 1,
  },
  {
    title: "Title2",
    content: "Title 2",
    userId: 2,
  },
  {
    title: "Title3",
    content: "Title 3",
    userId: 3,
  },
];

const seedBlogs = async () => {
  try {
    await Blog.bulkCreate(blogs);
    console.log("Blogs seeded successfully!");
  } catch (err) {
    console.error("Error seeding blogs:", err);
  }
};

module.exports = seedBlogs;
