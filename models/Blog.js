const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the Blog model by extending Sequelize's Model class
class Blog extends Model {}

// Initialize the Blog model with its properties and configurations
Blog.init(
  {
    // Define the title attribute with data type STRING and disallow null values
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the content attribute with data type TEXT and disallow null values
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // Define the sequelize connection
    sequelize,
    // Configure options for the model
    freezeTableName: true,  // Prevent sequelize from pluralizing the table name
    underscored: true,      // Use snake_case for automatic table name
    modelName: "blog",      // Set the model name to "blog"
  }
);

// Export the Blog model for use in other parts of the application
module.exports = Blog;
