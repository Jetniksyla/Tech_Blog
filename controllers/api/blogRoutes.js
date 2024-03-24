const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utilis/auth");

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({ include: [User, Comment] });
    // Sending the blog data as a response
    if (!blogData) {
      res.status(404).json({ message: "No blog found!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single blog created by userID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const userId = await Blog.findByPk(req.params.id, {
      include: [User, Comment],
    });
    if (!userId) {
      res.status(404).json({ message: "No user found with this ID!" });
    }
    res.status(200).json(userId);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new blog
router.post("/", withAuth, async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login!" });
    }

    // Create blog post with title and content input by user
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.user.id,
    });
    if (!newBlog) {
      res.status(404).json({ message: "Failed to create blog!" });
      return;
    }

    // Send response
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login!" });
    }
    // Find the blog post that needs updating
    const [updatedRows] = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Check if any rows were updated
    if (!updatedRows) {
      return res.status(404).json({ message: "No blog found with this ID!" });
    }

    res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login!" });
    }
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedBlog) {
      return res.status(404).json({ message: "No blog found with this ID!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
