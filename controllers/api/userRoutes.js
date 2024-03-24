const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models/");
const bcrypt = require("bcrypt");

// Get all users

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({ include: [Blog, Comment] });
    if (!userData) {
      res.status(404).json({ message: "No user found!" });
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route: logout by hitting /api/users/logout. Deletes session
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Get single user by user ID
router.get("/:id", async (req, res) => {
  try {
    const userId = await User.findByPk(req.params.id, {
      include: [Blog, Comment],
    });
    !userId
      ? res.status(404).json({ message: "User not found" })
      : res.status(200).json(userId);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body, { individualHooks: true });

    if (!newUser) {
      return res.status(404).json({ message: "Something went wrong!" });
    }

    // Set user session after creating a new user
    req.session.user = {
      id: newUser.id,
      username: newUser.username,
    };

    console.log("You have successfully created an account!");
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST route: user login api/users/login
router.post("/login", async (req, res) => {
  try {
    // Find username that matches request
    const foundUser = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    // If username is not found, send message
    if (!foundUser) {
      return res.status(404).json({ error: "User not found or incorrect username/password combination" });
    }

    // Compare password with saved hash
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      // If password matches, create session for user
      req.session.user = {
        id: foundUser.id,
        username: foundUser.username
      };
      return res.json(foundUser);
    } else {
      return res.status(400).json({ error: "User not found or incorrect username/password combination" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// PUT route: update a user by id
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE route: delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
