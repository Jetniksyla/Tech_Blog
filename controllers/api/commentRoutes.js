const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");

// Get all comments
router.get("/", async (req, res) => {
  try {
    // Fetch all comments from the database, including associated user and blog
    const commentData = await Comment.findAll({
      include: [User, Blog],
    });

    // Check if any comments were found
    if (!commentData) {
      res.status(404).json({ message: "No comments found." });
      return;
    }

    // Send the comment data as a response
    res.status(200).json(commentData);
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json(err);
  }
});

// Get single comment by its ID
router.get("/:id", async (req, res) => {
  try {
    // Find a single comment by its ID, including associated user and blog
    const commentId = await Comment.findByPk(req.params.id, {
      include: [User, Blog],
    });

    // Check if the comment exists
    if (!commentId) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      // Send the comment data as a response
      res.status(200).json(commentId);
    }
  } catch (err) {
    // Handle any errors that occur during the process
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

    // Create a new comment
    const newComment = await Comment.create({
      body: req.body.body,
      userId: req.session.user.id, // user ID accessing
      blogId: req.body.blogId,
    });

    // Check if the comment was created successfully
    if (!newComment) {
      throw new Error("Failed to create new comment");
    }

    // Send the new comment data as a response
    res.status(200).json(newComment);
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json(err);
  }
});

// Update a comment
router.put("/:id", async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login" });
    }

    // Update the comment with the specified ID
    const updatedComment = await Comment.update(req.body, {
      where: { id: req.params.id },
    });

    // Check if the comment was updated successfully
    if (!updatedComment) {
      return res.status(404).json({ message: "No Comment found with this ID!" });
    }

    // Send a success message as a response
    res.status(200).json(updatedComment);
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login!" });
    }

    // Delete the comment with the specified ID
    const deletedComment = await Comment.destroy({
      where: { id: req.params.id },
    });

    // Check if the comment was deleted successfully
    if (!deletedComment) {
      return res.status(404).json({ message: "No Comment found with this ID!" });
    }

    // Send a success message as a response
    res.status(200).json({ message: "Deletion Successful!" });
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
