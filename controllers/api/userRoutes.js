const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models/");
const bcrypt = require("bcrypt");

// Get all users
router.get("/", async (req, res) => {
  try {
    // Fetch all users from the database, including associated blogs and comments
    const userData = await User.findAll({ include: [Blog, Comment] });

    // Check if any users were found
    if (!userData) {
      res.status(404).json({ message: "No user found!" });
    }

    // Send the user data as a response
    res.status(200).json(userData);
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json(err);
  }
});

// GET route: logout by hitting /api/users/logout. Deletes session
router.get("/logout", (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy();
  // Redirect the user to the homepage
  res.redirect("/");
});

// Get single user by user ID
router.get("/:id", async (req, res) => {
  try {
    // Find a single user by their ID, including associated blogs and comments
    const userId = await User.findByPk(req.params.id, {
      include: [Blog, Comment],
    });

    // Check if the user exists
    !userId
      ? res.status(404).json({ message: "User not found" })
      : res.status(200).json(userId);
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json(err);
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    // Create a new user with the provided data, using bcrypt to hash the password
    const newUser = await User.create(req.body, { individualHooks: true });

    // Check if the user was created successfully
    if (!newUser) {
      return res.status(404).json({ message: "Something went wrong!" });
    }

    // Set user session after creating a new user
    req.session.user = {
      id: newUser.id,
      username: newUser.username,
    };

    // Send a success message and the new user data as a response
    console.log("You have successfully created an account!");
    res.status(201).json(newUser);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json(err);
  }
});

// POST route: user login api/users/login
router.post("/login", async (req, res) => {
  try {
    // Find the user by username
    const foundUser = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    // If the user is not found, return an error message
    if (!foundUser) {
      return res.status(404).json({ error: "User not found or incorrect username/password combination" });
    }

    // Compare the provided password with the hashed password stored in the database
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      // If the passwords match, create a session for the user
      req.session.user = {
        id: foundUser.id,
        username: foundUser.username
      };
      return res.json(foundUser);
    } else {
      // If the passwords do not match, return an error message
      return res.status(400).json({ error: "User not found or incorrect username/password combination" });
    }
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    return res.status(500).json(err);
  }
});

// PUT route: update a user by id
router.put("/:id", async (req, res) => {
  try {
    // Update the user with the specified ID
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    });

    // Send the updated user data as a response
    res.json(updatedUser);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE route: delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    // Delete the user with the specified ID
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id
      }
    });

    // Send a success message as a response
    res.json(deletedUser);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
