const Blog = require("../models/Blog");


// CREATE BLOG

const createBlog = async (req, res) => {

  try {

    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: req.user,
    });

    res.status(201).json(blog);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL BLOGS

const getBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find()
      .populate(
        "author",
        "_id username email"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET MY BLOGS

const getMyBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find({
      author: req.user,
    }).sort({ createdAt: -1 });

    res.status(200).json(blogs);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE BLOG

const getSingleBlog = async (
  req,
  res
) => {

  try {

    const blog =
      await Blog.findById(
        req.params.id
      )
        .populate(
          "author",
          "username email"
        )
        .populate(
          "comments.user",
          "username"
        );

    res.status(200).json(blog);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE BLOG

const deleteBlog = async (req, res) => {

  try {

    await Blog.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Blog deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE BLOG

const updateBlog = async (req, res) => {

  try {

    const { title, content } = req.body;

    const updatedBlog =
      await Blog.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
        },
        {
          new: true,
        }
      );

    res.status(200).json(updatedBlog);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const likeBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(
      req.params.id
    );

    const alreadyLiked =
      blog.likes.includes(req.user);

    if (alreadyLiked) {

      blog.likes =
        blog.likes.filter(
          (id) =>
            id.toString() !==
            req.user
        );

    } else {

      blog.likes.push(req.user);
    }

    await blog.save();

    res.status(200).json(blog);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getFeedBlogs = async (
  req,
  res
) => {

  try {

    const User = require("../models/User");

    const currentUser =
      await User.findById(req.user);

    const blogs = await Blog.find({
      author: {
        $in: currentUser.following,
      },
    })
      .populate(
        "author",
        "_id username"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const addComment = async (
  req,
  res
) => {

  try {

    const { text } = req.body;

    const blog =
      await Blog.findById(
        req.params.id
      );

    blog.comments.push({
      user: req.user,
      text,
    });

    await blog.save();

    const updatedBlog =
      await Blog.findById(
        req.params.id
      )
        .populate(
          "comments.user",
          "username"
        );

    res.status(200).json(
      updatedBlog
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createBlog,
  getBlogs,
  getMyBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  likeBlog,
  getFeedBlogs,
  addComment,
};