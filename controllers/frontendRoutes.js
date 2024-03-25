const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../models"); // Import models from the correct location

// GET route: Display all blogs on the home page
router.get("/", (req, res) => {
  Blog.findAll({ include: [User] })
    .then((blogs) => {
      // Map fetched blogs to plain objects
      const hbsBlogs = blogs.map((blog) => blog.get({ plain: true }));
      // Check if user is logged in
      const loggedIn = req.session.user ? true : false;
      // Render the home page with blog data and login status
      res.render("home", {
        blogs: hbsBlogs,
        loggedIn,
        username: req.session.user?.username,
      });
    })
    .catch((err) => {
      // Handle errors
      console.error("Error fetching blogs:", err);
      res.status(500).send("Internal Server Error");
    });
});

// GET route: Render the login page
router.get("/login", (req, res) => {
  // Redirect to dashboard if user is already logged in
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  // Render the login page
  res.render("login");
});

// GET route: Render the signup page
router.get("/signup", (req, res) => {
  // Render the signup page
  res.render("signup");
});

// GET route: Render the dashboard page
router.get("/dashboard", (req, res) => {
  // Redirect to login if user is not logged in
  if (!req.session.user) {
    return res.redirect("/login");
  }
  // Fetch user data including associated blogs and comments
  User.findByPk(req.session.user.id, {
    include: [Blog, Comment],
  }).then((userData) => {
    // Check if user data exists
    if (!userData) {
      console.error("User data not found");
      return res.status(404).send("User data not found");
    }
    // Convert fetched data to plain object
    const hbsData = userData.get({ plain: true });
    // Set login status
    hbsData.loggedIn = req.session.user ? true : false;
    // Render the dashboard page with user data
    res.render("dashboard", hbsData);
  }).catch((err) => {
    // Handle errors
    console.error("Error fetching user data:", err);
    res.status(500).send("Internal Server Error");
  });
});

// GET route: Render a single blog post page
router.get("/blogs/:id", (req, res) => {
  // Redirect to login if user is not logged in
  if (!req.session.user) {
    return res.redirect("/login");
  }
  // Fetch blog data including associated user and comments
  Blog.findByPk(req.params.id, {
    include: [User, { model: Comment, include: [User] }],
  })
    .then((dbBlog) => {
      // Convert fetched data to plain object
      const hbsBlog = dbBlog.get({ plain: true });
      // Set login status
      const loggedIn = req.session.user ? true : false;
      // Determine which page to render based on ownership of the blog post
      if (dbBlog.userId != req.session.user.id) {
        // If not the owner of the post, render comment page
        return res.render("comment", {
          hbsBlog,
          loggedIn,
          username: req.session.user?.username,
        });
      }
      // If the owner of the post, render delete/update page
      res.render("deleteupdate", {
        hbsBlog,
        loggedIn,
        username: req.session.user?.username,
      });
    })
    .catch((err) => {
      // Handle errors
      console.log(err);
      res.status(500).json({ msg: "Oops.. there is an error", err });
    });
});

// GET route: Redirect to home page for any other route
router.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;
