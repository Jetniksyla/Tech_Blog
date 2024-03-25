const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the Comment model by extending Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model with its properties and configurations
Comment.init(
  {
    // Define the body attribute with data type TEXT and disallow null values
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define the date attribute with data type DATE and default value as the current date/time
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Define the sequelize connection
    sequelize,
    // Configure options for the model
    freezeTableName: true,  // Prevent sequelize from pluralizing the table name
    underscored: true,      // Use snake_case for automatic table name
    modelName: "comment",   // Set the model name to "comment"
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
