const seedUser = require("./seedUser");
const seedBlog = require("./seedBlog");
const seedComment = require(`./seedComment`);

// Inserts seed entries in the table `users`

const seedUsers = require('./user-seeds');
const seedBlogs = require('./blog-seeds');
const seedComments = require('./comment-seeds');

const seedAll = async () => {
    await seedUsers();
    await seedBlogs();
    await seedComments();
    console.log('All seed data inserted successfully!');
    process.exit(0);
};

seedAll();