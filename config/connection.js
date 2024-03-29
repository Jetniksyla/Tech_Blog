const Sequelize = require('sequelize');
require('dotenv').config(); // Ensures your .env file is read in development

let sequelize;

if (process.env.JAWSDB_URL) {
    // Heroku deployment: Use JAWSDB_URL
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Local development: Use local database settings
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306 // Default MySQL port
    });
}

module.exports = sequelize;
