// Importing models
const User = require("./User");       // Import the User model
const Blog = require("./Blog");       // Import the Blog model
const Comment = require("./Comment"); // Import the Comment model

// Defining associations between models
User.hasMany(Blog);                   // A user can have many blogs
Blog.belongsTo(User);                 // Each blog belongs to a user

Blog.hasMany(Comment);                // A blog can have many comments
Comment.hasMany(Blog);              // Each comment hasMany blog

User.hasMany(Comment);                // A user can have many comments
Comment.belongsTo(User);              // Each comment belongs to a user

// Exporting models and associations
module.exports = {
  User,
  Blog,
  Comment,
};
