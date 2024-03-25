const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// Define the User model by extending Sequelize's Model class
class User extends Model {}

// Initialize the User model with its properties and configurations
User.init(
  {
    // Define the username attribute with data type STRING, disallow null values, and ensure uniqueness
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Define the password attribute with data type STRING, disallow null values, and validate minimum length
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Minimum length of the password
      },
    },
  },
  {
    // Define hooks to hash the password before creating a new user
    hooks: {
      beforeCreate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 10); // Hash the password with bcrypt
        return userData;
      },
    },
    // Define the sequelize connection
    sequelize,
    // Configure options for the model
    freezeTableName: true,  // Prevent sequelize from pluralizing the table name
    underscored: true,      // Use snake_case for automatic table name
    modelName: "user",      // Set the model name to "user"
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
