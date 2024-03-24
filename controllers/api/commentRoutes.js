const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User, Blog],
    });

    if (!commentData) {
      res.status(404).json({ message: "No comments found." });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single comment created by user
router.get("/:id", async (req, res) => {
  try {
    const commentId = await Comment.findByPk(req.params.id, {
      include: [User, Blog],
    });
    if (!commentId) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(200).json(commentId);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new comment
router.post("/", async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login!" });
    }
    // Create new comment
    const newComment = await Comment.create({
      body: req.body.body,
      userId: req.session.user.id, // user ID access
      blogId: req.body.blogId,
    });
    if (!newComment) {
      throw new Error("Failed to create new comment");
    }
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login" });
    }
    const updatedComment = await Comment.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedComment) {
      return res
        .status(404)
        .json({ message: "No Comment found with this ID!" });
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login!" });
    }
    const deletedComment = await Comment.destroy({
      where: { id: req.params.id },
    });

    if (!deletedComment) {
      return res
        .status(404)
        .json({ message: "No Comment found with this ID!" });
    }
    res.status(200).json({ message: "Deletion Successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
