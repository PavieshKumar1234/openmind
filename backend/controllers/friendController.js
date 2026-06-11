const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const users = await User.find({
      _id: { $ne: req.user._id },
    }).select("name email avatar bio friends friendRequests");

    const formattedUsers = users.map((user) => {
      const isFriend = currentUser.friends.some(
        (friendId) => friendId.toString() === user._id.toString()
      );

      const requestSent = user.friendRequests.some(
        (request) =>
          request.from.toString() === req.user._id.toString() &&
          request.status === "pending"
      );

      const requestReceived = currentUser.friendRequests.some(
        (request) =>
          request.from.toString() === user._id.toString() &&
          request.status === "pending"
      );

      let status = "none";

      if (isFriend) {
        status = "friend";
      } else if (requestSent) {
        status = "request_sent";
      } else if (requestReceived) {
        status = "request_received";
      }

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        status,
      };
    });

    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users.",
      error: error.message,
    });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    const targetUserId = req.params.userId;

    if (targetUserId === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot send request to yourself.",
      });
    }

    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const alreadyFriend = currentUser.friends.some(
      (friendId) => friendId.toString() === targetUserId
    );

    if (alreadyFriend) {
      return res.status(400).json({
        message: "This user is already your friend.",
      });
    }

    const alreadySent = targetUser.friendRequests.some(
      (request) =>
        request.from.toString() === req.user._id.toString() &&
        request.status === "pending"
    );

    if (alreadySent) {
      return res.status(400).json({
        message: "Friend request already sent.",
      });
    }

    const requestReceived = currentUser.friendRequests.some(
      (request) =>
        request.from.toString() === targetUserId &&
        request.status === "pending"
    );

    if (requestReceived) {
      return res.status(400).json({
        message: "This user already sent you a request. Accept it from Friend Requests.",
      });
    }

    targetUser.friendRequests.push({
      from: req.user._id,
      status: "pending",
    });

    await targetUser.save();

    res.status(201).json({
      message: "Friend request sent successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send friend request.",
      error: error.message,
    });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "friendRequests.from",
      "name email avatar bio"
    );

    const requests = user.friendRequests
      .filter((request) => request.status === "pending")
      .map((request) => ({
        requestId: request._id,
        from: {
          id: request.from._id,
          name: request.from.name,
          email: request.from.email,
          avatar: request.from.avatar,
          bio: request.from.bio,
        },
      }));

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch friend requests.",
      error: error.message,
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const senderId = req.params.userId;

    const currentUser = await User.findById(req.user._id);
    const senderUser = await User.findById(senderId);

    if (!senderUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const requestIndex = currentUser.friendRequests.findIndex(
      (request) =>
        request.from.toString() === senderId && request.status === "pending"
    );

    if (requestIndex === -1) {
      return res.status(404).json({
        message: "Friend request not found.",
      });
    }

    currentUser.friendRequests.splice(requestIndex, 1);

    if (!currentUser.friends.includes(senderId)) {
      currentUser.friends.push(senderId);
    }

    if (!senderUser.friends.includes(req.user._id)) {
      senderUser.friends.push(req.user._id);
    }

    await currentUser.save();
    await senderUser.save();

    res.status(200).json({
      message: "Friend request accepted.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to accept friend request.",
      error: error.message,
    });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const senderId = req.params.userId;

    const currentUser = await User.findById(req.user._id);

    const requestIndex = currentUser.friendRequests.findIndex(
      (request) =>
        request.from.toString() === senderId && request.status === "pending"
    );

    if (requestIndex === -1) {
      return res.status(404).json({
        message: "Friend request not found.",
      });
    }

    currentUser.friendRequests.splice(requestIndex, 1);

    await currentUser.save();

    res.status(200).json({
      message: "Friend request rejected.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject friend request.",
      error: error.message,
    });
  }
};

const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "friends",
      "name email avatar bio"
    );

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch friends.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  getMyFriends,
};