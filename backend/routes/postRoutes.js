const express = require("express");

const {
  getPosts,
  getFriendPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPosts);
router.get("/friends/feed", protect, getFriendPosts);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;