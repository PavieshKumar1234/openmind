const express = require("express");

const {
  addComment,
  deleteComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:postId/comments", protect, addComment);
router.delete("/:postId/comments/:commentId", protect, deleteComment);

module.exports = router;