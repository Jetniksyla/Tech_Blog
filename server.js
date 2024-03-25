// Import necessary modules
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const session = require('express-session');
const sequelize = require('./config/connection');

// Store session data
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config(); // Load environment variables
const helpers = require('./utilis/helpers'); // Import helper functions

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3001; // Set the PORT number

// Create an instance of Handlebars engine with helpers
const hbs = exphbs.create({ helpers });

const { User, Blog, Comment } = require('./models'); // Import database models

// Configuration for session
const sess = {
  secret: 'Super secret secret', // Secret for session encryption
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Session expiry time (24 hours)
  },
  resave: false, // Prevents session data from being saved again if not modified
  saveUninitialized: true, // Saves uninitialized sessions
  store: new SequelizeStore({ // Configure session store
    db: sequelize, // Use Sequelize for session store
  }),
};

// Middleware to handle sessions
app.use(session(sess));

// Configure Handlebars engine
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main', // Set the default layout file
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Specify the layouts directory
  })
);
app.set('view engine', 'handlebars'); // Set Handlebars as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route handling
app.use('/', routes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log('Now listening'); // Log message when server starts listening
  });
});
