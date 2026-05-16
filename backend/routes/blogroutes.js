const express = require("express");

const router = express.Router();

const {
  createBlog,
  getBlogs,
  getMyBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  likeBlog,
  getFeedBlogs,
  addComment,
} = require("../controllers/blogController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);


// CREATE BLOG

router.post(
  "/",
  authMiddleware,
  createBlog
);

router.get(
  "/feed",
  authMiddleware,
  getFeedBlogs
);

router.post(
  "/comment/:id",
  authMiddleware,
  addComment
);
// GET ALL BLOGS

router.get(
  "/",
  getBlogs
);


// GET MY BLOGS

router.get(
  "/myblogs",
  authMiddleware,
  getMyBlogs
);


// GET SINGLE BLOG

router.get(
  "/:id",
  getSingleBlog
);


// DELETE BLOG

router.delete(
  "/:id",
  authMiddleware,
  deleteBlog
);


// UPDATE BLOG

router.put(
  "/:id",
  authMiddleware,
  updateBlog
);

router.put(
  "/like/:id",
  authMiddleware,
  likeBlog
);
module.exports = router;