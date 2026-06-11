const Post = require("../models/Post");

const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Comment text is required.",
      });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    const comment = {
      user: req.user._id,
      userName: req.user.name,
      userAvatar: req.user.avatar,
      text,
    };

    post.comments.push(comment);
    await post.save();

    const updatedPost = await Post.findById(req.params.postId).populate(
      "author",
      "name email avatar bio"
    );

    res.status(201).json({
      message: "Comment added successfully.",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment.",
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found.",
      });
    }

    const isCommentOwner = comment.user.toString() === req.user._id.toString();
    const isPostOwner = post.author.toString() === req.user._id.toString();

    if (!isCommentOwner && !isPostOwner) {
      return res.status(403).json({
        message: "You can delete only your own comment.",
      });
    }

    comment.deleteOne();
    await post.save();

    const updatedPost = await Post.findById(postId).populate(
      "author",
      "name email avatar bio"
    );

    res.status(200).json({
      message: "Comment deleted successfully.",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete comment.",
      error: error.message,
    });
  }
};

module.exports = {
  addComment,
  deleteComment,
};