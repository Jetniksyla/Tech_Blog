// Import Sequelize library
const Sequelize = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

let sequelize;

// Check if JAWSDB_URL environment variable is set (for deployment on Heroku)
if (process.env.JAWSDB_URL) {
  // Create Sequelize instance using JAWSDB_URL for database connection
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Create Sequelize instance using local database credentials
  sequelize = new Sequelize(
    process.env.DB_NAME,      // Database name
    process.env.DB_USER,      // Database username
    process.env.DB_PASSWORD,  // Database password
    {
      host: 'localhost',      // Database host
      dialect: 'mysql',       // Database dialect (MySQL in this case)
      port: 3306              // Database port
    }
  );
}

// Export the sequelize instance for use in other modules
module.exports = sequelize;
