const express = require("express");
const router = express.Router();

// Require controller modules.

const blogRoutes = require("./api/blogRoutes");
router.use("/api/blogs", blogRoutes);

const commentRoutes = require("./api/commentRoutes");
router.use("/api/comments", commentRoutes);

const userRouter = require("./api/userRoutes");
router.use("./api/users", userRouter);

const frontEnd = require("./frontendRoutes");
router.use("/", frontEnd);

// GET default route to the home page

router.get("/*", req, (res) => {
  res.json(req.session);
});
