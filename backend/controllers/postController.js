const Post = require("../models/Post");
const User = require("../models/User");

const AUTHOR_FIELDS = "name email avatar bio profileImage";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", AUTHOR_FIELDS)
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch posts.",
      error: error.message,
    });
  }
};

const getFriendPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("friends");

    const allowedAuthors = [...currentUser.friends, req.user._id];

    const posts = await Post.find({
      author: { $in: allowedAuthors },
    })
      .populate("author", AUTHOR_FIELDS)
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch friends posts.",
      error: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required.",
      });
    }

    const post = await Post.create({
      title,
      content,
      image,
      author: req.user._id,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      AUTHOR_FIELDS
    );

    res.status(201).json({
      message: "Post created successfully.",
      post: populatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post.",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can edit only your own posts.",
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    if (image !== undefined) {
      post.image = image;
    }

    const updatedPost = await post.save();

    const populatedPost = await Post.findById(updatedPost._id).populate(
      "author",
      AUTHOR_FIELDS
    );

    res.status(200).json({
      message: "Post updated successfully.",
      post: populatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update post.",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can delete only your own posts.",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete post.",
      error: error.message,
    });
  }
};

module.exports = {
  getPosts,
  getFriendPosts,
  createPost,
  updatePost,
  deletePost,
};