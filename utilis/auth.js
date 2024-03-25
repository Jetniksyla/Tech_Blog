// Middleware function to check if the user is authenticated
const withAuth = (req, res, next) => {
  // Check if the user_id is present in the session
  if (!req.session.user_id) {
    // If user_id is not present, redirect to the login page
    res.redirect('/login');
    return;
  } else {
    // If user_id is present, proceed to the next middleware
    next();
  }
}

// Export the middleware function for use in other modules
module.exports = withAuth;
