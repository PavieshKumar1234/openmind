const express = require("express");

const {
  getAllUsers,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  getMyFriends,
} = require("../controllers/friendController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.post("/request/:userId", protect, sendFriendRequest);
router.get("/requests", protect, getFriendRequests);
router.put("/accept/:userId", protect, acceptFriendRequest);
router.delete("/reject/:userId", protect, rejectFriendRequest);
router.get("/my-friends", protect, getMyFriends);

module.exports = router;