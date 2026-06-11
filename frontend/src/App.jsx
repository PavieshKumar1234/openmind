import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  PlusCircle,
  User,
  LogOut,
  MessageCircle,
  Send,
  Edit,
  Trash2,
  Lightbulb,
  Users,
  UserPlus,
  Bell,
  Sun,
  Moon,
  ImagePlus,
} from "lucide-react";

import API from "./api";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      reject(new Error("Please upload only image files."));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      reject(new Error("Image size must be below 2MB."));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image file."));
    };

    reader.readAsDataURL(file);
  });
}

function makeUsername(name) {
  return "@" + (name || "openmind").toLowerCase().replaceAll(" ", "");
}

function formatPost(post) {
  return {
    id: post._id,
    title: post.title,
    content: post.content,
    image: post.image || DEFAULT_IMAGE,
    authorName: post.author?.name || "OpenMind User",
    authorEmail: post.author?.email || "",
    authorAvatar: post.author?.avatar || "OU",
    authorProfileImage: post.author?.profileImage || "",
    username: makeUsername(post.author?.name),
    createdAt: new Date(post.createdAt).toLocaleString(),
    comments:
      post.comments?.map((comment) => ({
        id: comment._id,
        user: comment.userName,
        text: comment.text,
      })) || [],
  };
}

function RoundAvatar({ image, text, className }) {
  if (image) {
    return (
      <img
        className={`${className} avatar-picture`}
        src={image}
        alt={text}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return <div className={className}>{text}</div>;
}

function EntryScreen({ onFinish }) {
  const title = "OPENMIND";

  useEffect(() => {
    const timer = setTimeout(onFinish, 7500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.section
      className="entry-screen"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9 }}
    >
      <div className="entry-wall-grid"></div>
      <div className="entry-glow"></div>

      <div className="switch-box left-switch"></div>
      <div className="switch-box right-switch"></div>
      <div className="wire-left"></div>
      <div className="wire-right"></div>
      <div className="electric-line line-one"></div>
      <div className="electric-line line-two"></div>

      <div className="entry-content">
        <div className="title-wrapper">
          {title.split("").map((letter, index) => (
            <motion.span
              key={index}
              className="neon-letter"
              initial={{
                opacity: 0,
                y: 80,
                scale: 0.7,
                filter: "blur(16px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 1 + index * 0.18,
                duration: 0.55,
                ease: "easeOut",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="entry-logo"
          initial={{ opacity: 0, y: 35, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          <Lightbulb size={42} />
        </motion.div>

        <motion.p
          className="entry-small-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 0.6 }}
        >
          BLOG APP
        </motion.p>

        <motion.p
          className="entry-description"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.8 }}
        >
          Share your thoughts. Open your mind. Turn simple ideas into powerful
          stories.
        </motion.p>

        <motion.p
          className="entry-quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.9, duration: 0.8 }}
        >
          “Where ideas become stories.”
        </motion.p>

        <motion.button
          onClick={onFinish}
          className="entry-button"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.6, duration: 0.7 }}
        >
          ENTER OPENMIND
        </motion.button>
      </div>
    </motion.section>
  );
}

function Login({ onLogin, onSwitchRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/auth/login", form);

      localStorage.setItem("openmind-token", response.data.token);
      localStorage.setItem("openmind-user", JSON.stringify(response.data.user));

      onLogin(response.data.user);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="app-bg-lines"></div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>OpenMind</h1>
        <p>Welcome back to your ideas</p>

        <input
          type="email"
          placeholder="Email address"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="primary-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button type="button" className="link-btn" onClick={onSwitchRegister}>
          New to OpenMind? Register
        </button>
      </form>
    </section>
  );
}

function Register({ onRegister, onSwitchLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/auth/register", form);

      localStorage.setItem("openmind-token", response.data.token);
      localStorage.setItem("openmind-user", JSON.stringify(response.data.user));

      onRegister(response.data.user);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="app-bg-lines"></div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>OpenMind</h1>
        <p>Create your writing identity</p>

        <input
          placeholder="Full name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email address"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password minimum 6 characters"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="primary-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <button type="button" className="link-btn" onClick={onSwitchLogin}>
          Already have an account? Login
        </button>
      </form>
    </section>
  );
}

function Sidebar({ page, setPage, onLogout, theme, onToggleTheme }) {
  return (
    <aside className="sidebar">
      <h1>OpenMind</h1>
      <p>Modern Social Blogging Platform</p>

      <button
        className={page === "feed" ? "active" : ""}
        onClick={() => setPage("feed")}
      >
        <Home size={20} /> Feed
      </button>

      <button
        className={page === "create" ? "active" : ""}
        onClick={() => setPage("create")}
      >
        <PlusCircle size={20} /> Create
      </button>

      <button
        className={page === "users" ? "active" : ""}
        onClick={() => setPage("users")}
      >
        <Users size={20} /> Explore Users
      </button>

      <button
        className={page === "requests" ? "active" : ""}
        onClick={() => setPage("requests")}
      >
        <Bell size={20} /> Friend Requests
      </button>

      <button
        className={page === "friends" ? "active" : ""}
        onClick={() => setPage("friends")}
      >
        <UserPlus size={20} /> My Friends
      </button>

      <button
        className={page === "profile" ? "active" : ""}
        onClick={() => setPage("profile")}
      >
        <User size={20} /> Profile
      </button>

      <button className="theme-toggle-btn" onClick={onToggleTheme}>
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>

      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}

function MobileNav({ page, setPage, theme, onToggleTheme }) {
  return (
    <div className="mobile-nav">
      <button
        className={page === "feed" ? "active" : ""}
        onClick={() => setPage("feed")}
      >
        <Home />
      </button>

      <button
        className={page === "create" ? "active" : ""}
        onClick={() => setPage("create")}
      >
        <PlusCircle />
      </button>

      <button
        className={page === "users" ? "active" : ""}
        onClick={() => setPage("users")}
      >
        <Users />
      </button>

      <button
        className={page === "requests" ? "active" : ""}
        onClick={() => setPage("requests")}
      >
        <Bell />
      </button>

      <button
        className={page === "profile" ? "active" : ""}
        onClick={() => setPage("profile")}
      >
        <User />
      </button>

      <button onClick={onToggleTheme}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}

function CommentBox({ onSend }) {
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  return (
    <form className="comment-form" onSubmit={submit}>
      <input
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button>
        <Send size={17} />
      </button>
    </form>
  );
}

function PostCard({ post, user, onDelete, onEdit, onComment }) {
  const isOwner = post.authorEmail === user.email;

  return (
    <motion.article
      className="post-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="post-header">
        <RoundAvatar
          image={post.authorProfileImage}
          text={post.authorAvatar}
          className="avatar"
        />

        <div>
          <h3>{post.authorName}</h3>
          <p>
            {post.username} · {post.createdAt}
          </p>
        </div>

        {isOwner && (
          <div className="post-actions">
            <button onClick={() => onEdit(post)}>
              <Edit size={18} />
            </button>

            <button onClick={() => onDelete(post.id)}>
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      <img
        className="post-image"
        src={post.image || DEFAULT_IMAGE}
        alt={post.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = DEFAULT_IMAGE;
        }}
      />

      <div className="post-body">
        <h2>{post.title}</h2>
        <p>{post.content}</p>

        <div className="comment-section">
          <h4>
            <MessageCircle size={18} /> Comments
          </h4>

          {post.comments.length === 0 && (
            <p className="empty-comment">
              No comments yet. Be the first to comment.
            </p>
          )}

          {post.comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <b>{comment.user}: </b>
              {comment.text}
            </div>
          ))}

          <CommentBox onSend={(text) => onComment(post.id, text)} />
        </div>
      </div>
    </motion.article>
  );
}

function Feed({
  posts,
  user,
  onDelete,
  onEdit,
  onComment,
  loading,
  feedMode,
  setFeedMode,
}) {
  return (
    <main>
      <div className="page-heading">
        <h2>Open Feed</h2>
        <p>Discover thoughts, stories, and ideas from the community.</p>
      </div>

      <div className="feed-tabs">
        <button
          className={feedMode === "all" ? "active" : ""}
          onClick={() => setFeedMode("all")}
        >
          All Blogs
        </button>

        <button
          className={feedMode === "friends" ? "active" : ""}
          onClick={() => setFeedMode("friends")}
        >
          Friends Blogs
        </button>
      </div>

      {loading && <p className="muted">Loading posts...</p>}

      {!loading && posts.length === 0 && <p className="muted">No posts found.</p>}

      <div className="feed-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            user={user}
            onDelete={onDelete}
            onEdit={onEdit}
            onComment={onComment}
          />
        ))}
      </div>
    </main>
  );
}

function CreatePost({ onCreate }) {
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleImageUpload(e) {
    try {
      const file = e.target.files?.[0];
      const dataUrl = await fileToDataUrl(file);

      setForm({ ...form, image: dataUrl });
      setPreview(dataUrl);
    } catch (error) {
      alert(error.message);
      e.target.value = "";
    }
  }

  function handleImageUrlChange(e) {
    const value = e.target.value;

    setForm({ ...form, image: value });
    setPreview(value);
  }

  async function submit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/posts", form);

      onCreate(formatPost(response.data.post));

      setForm({ title: "", content: "", image: "" });
      setPreview("");
    } catch (error) {
      alert(error.response?.data?.message || "Post creation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="page-heading">
        <h2>Create Post</h2>
        <p>Upload an image directly or paste an image URL.</p>
      </div>

      <form className="create-card" onSubmit={submit}>
        <input
          placeholder="Post title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Write your blog content..."
          required
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        ></textarea>

        <div className="upload-box">
          <label>
            <ImagePlus size={20} />
            Upload Image from Computer
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          <p>Maximum image size: 2MB</p>
        </div>

        <input
          placeholder="Or paste image URL"
          value={form.image.startsWith("data:") ? "" : form.image}
          onChange={handleImageUrlChange}
        />

        {preview && (
          <img
            className="upload-preview"
            src={preview}
            alt="preview"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
        )}

        <button className="primary-btn" disabled={loading}>
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </main>
  );
}

function ExploreUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await API.get("/friends/users");
      setUsers(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  async function sendRequest(userId) {
    try {
      await API.post(`/friends/request/${userId}`);

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: "request_sent" } : user
        )
      );

      alert("Friend request sent");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send request");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main>
      <div className="page-heading">
        <h2>Explore Users</h2>
        <p>Find users, send friend requests, and build your OpenMind circle.</p>
      </div>

      {loading && <p className="muted">Loading users...</p>}

      <div className="user-grid">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            {user.profileImage ? (
              <img
                className="user-avatar avatar-picture"
                src={user.profileImage}
                alt={user.name}
              />
            ) : (
              <div className="user-avatar">{user.avatar}</div>
            )}

            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span>{user.bio}</span>

              {user.status === "none" && (
                <button className="small-btn" onClick={() => sendRequest(user.id)}>
                  Send Request
                </button>
              )}

              {user.status === "request_sent" && (
                <button className="small-btn disabled-btn" disabled>
                  Request Sent
                </button>
              )}

              {user.status === "request_received" && (
                <button className="small-btn disabled-btn" disabled>
                  Request Received
                </button>
              )}

              {user.status === "friend" && (
                <button className="small-btn disabled-btn" disabled>
                  Friend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchRequests() {
    try {
      setLoading(true);
      const response = await API.get("/friends/requests");
      setRequests(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  }

  async function acceptRequest(userId) {
    try {
      await API.put(`/friends/accept/${userId}`);
      setRequests(requests.filter((request) => request.from.id !== userId));
      alert("Friend request accepted");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to accept request");
    }
  }

  async function rejectRequest(userId) {
    try {
      await API.delete(`/friends/reject/${userId}`);
      setRequests(requests.filter((request) => request.from.id !== userId));
      alert("Friend request rejected");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reject request");
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <main>
      <div className="page-heading">
        <h2>Friend Requests</h2>
        <p>Accept or reject incoming friend requests.</p>
      </div>

      {loading && <p className="muted">Loading requests...</p>}

      {!loading && requests.length === 0 && (
        <p className="muted">No friend requests yet.</p>
      )}

      <div className="user-grid">
        {requests.map((request) => (
          <div className="user-card" key={request.requestId}>
            {request.from.profileImage ? (
              <img
                className="user-avatar avatar-picture"
                src={request.from.profileImage}
                alt={request.from.name}
              />
            ) : (
              <div className="user-avatar">{request.from.avatar}</div>
            )}

            <div className="user-info">
              <h3>{request.from.name}</h3>
              <p>{request.from.email}</p>
              <span>{request.from.bio}</span>

              <div className="request-actions">
                <button
                  className="small-btn"
                  onClick={() => acceptRequest(request.from.id)}
                >
                  Accept
                </button>

                <button
                  className="danger-small-btn"
                  onClick={() => rejectRequest(request.from.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function MyFriends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchFriends() {
    try {
      setLoading(true);
      const response = await API.get("/friends/my-friends");
      setFriends(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch friends");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <main>
      <div className="page-heading">
        <h2>My Friends</h2>
        <p>Your accepted OpenMind connections.</p>
      </div>

      {loading && <p className="muted">Loading friends...</p>}

      {!loading && friends.length === 0 && (
        <p className="muted">No friends yet. Explore users and send requests.</p>
      )}

      <div className="user-grid">
        {friends.map((friend) => (
          <div className="user-card" key={friend._id}>
            {friend.profileImage ? (
              <img
                className="user-avatar avatar-picture"
                src={friend.profileImage}
                alt={friend.name}
              />
            ) : (
              <div className="user-avatar">{friend.avatar}</div>
            )}

            <div className="user-info">
              <h3>{friend.name}</h3>
              <p>{friend.email}</p>
              <span>{friend.bio}</span>
              <button className="small-btn disabled-btn" disabled>
                Friend
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function Profile({ user, posts, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: user.name || "",
    bio: user.bio || "",
    profileImage: user.profileImage || "",
  });

  const [preview, setPreview] = useState(user.profileImage || "");
  const [loading, setLoading] = useState(false);

  const myPosts = posts.filter((post) => post.authorEmail === user.email);

  const totalComments = myPosts.reduce(
    (total, post) => total + post.comments.length,
    0
  );

  async function handleProfileImageUpload(e) {
    try {
      const file = e.target.files?.[0];
      const dataUrl = await fileToDataUrl(file);

      setForm({ ...form, profileImage: dataUrl });
      setPreview(dataUrl);
    } catch (error) {
      alert(error.message);
      e.target.value = "";
    }
  }

  function handleProfileImageUrlChange(e) {
    const value = e.target.value;

    setForm({ ...form, profileImage: value });
    setPreview(value);
  }

  async function updateProfile(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.put("/auth/profile", form);

      localStorage.setItem("openmind-user", JSON.stringify(response.data.user));

      onUpdateUser(response.data.user);
      setIsEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="page-heading">
        <h2>Profile</h2>
        <p>Your personal OpenMind space.</p>
      </div>

      <section className="profile-card">
        {user.profileImage ? (
          <img
            className="profile-avatar-img"
            src={user.profileImage}
            alt={user.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="profile-avatar">{user.avatar}</div>
        )}

        <div className="profile-details">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <span>{user.bio}</span>

          <div className="profile-stats">
            <div>
              <b>{myPosts.length}</b>
              <small>Posts</small>
            </div>

            <div>
              <b>{totalComments}</b>
              <small>Comments</small>
            </div>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => {
              setForm({
                name: user.name || "",
                bio: user.bio || "",
                profileImage: user.profileImage || "",
              });
              setPreview(user.profileImage || "");
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Close Edit" : "Edit Profile"}
          </button>
        </div>
      </section>

      {isEditing && (
        <form className="edit-profile-card" onSubmit={updateProfile}>
          <h3>Edit Profile</h3>

          <input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            placeholder="Profile description / bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          ></textarea>

          <div className="upload-box">
            <label>
              <ImagePlus size={20} />
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
              />
            </label>

            <p>Maximum image size: 2MB</p>
          </div>

          <input
            placeholder="Or paste profile image URL"
            value={form.profileImage.startsWith("data:") ? "" : form.profileImage}
            onChange={handleProfileImageUrlChange}
          />

          {preview && (
            <img
              className="profile-upload-preview"
              src={preview}
              alt="profile preview"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          <button className="primary-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      )}

      <h3 className="section-title">My Posts</h3>

      <div className="profile-post-grid">
        {myPosts.length === 0 && (
          <p className="muted">You have not created posts yet.</p>
        )}

        {myPosts.map((post) => (
          <div className="profile-post" key={post.id}>
            <img
              src={post.image || DEFAULT_IMAGE}
              alt={post.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
            <div>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function EditModal({ editingPost, setEditingPost, onSave }) {
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.put(`/posts/${editingPost.id}`, {
        title: editingPost.title,
        content: editingPost.content,
        image: editingPost.image,
      });

      onSave(formatPost(response.data.post));
    } catch (error) {
      alert(error.response?.data?.message || "Post update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-bg">
      <form className="edit-modal" onSubmit={submit}>
        <h2>Edit Post</h2>

        <input
          value={editingPost.title}
          onChange={(e) =>
            setEditingPost({ ...editingPost, title: e.target.value })
          }
        />

        <textarea
          value={editingPost.content}
          onChange={(e) =>
            setEditingPost({ ...editingPost, content: e.target.value })
          }
        ></textarea>

        <input
          value={editingPost.image.startsWith("data:") ? "Uploaded image saved" : editingPost.image}
          onChange={(e) =>
            setEditingPost({ ...editingPost, image: e.target.value })
          }
        />

        <div className="modal-actions">
          <button className="primary-btn" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            className="dark-btn"
            onClick={() => setEditingPost(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Dashboard({ user, onLogout, onUpdateUser, theme, onToggleTheme }) {
  const [page, setPage] = useState("feed");
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [feedMode, setFeedMode] = useState("all");

  async function fetchPosts() {
    try {
      setLoadingPosts(true);

      const url = feedMode === "friends" ? "/posts/friends/feed" : "/posts";

      const response = await API.get(url);

      const formattedPosts = response.data.map((post) => formatPost(post));

      setPosts(formattedPosts);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoadingPosts(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [feedMode]);

  function createPost(post) {
    setPosts([post, ...posts]);
    setPage("feed");
    setFeedMode("all");
  }

  async function deletePost(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`);

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Post delete failed");
    }
  }

  async function addComment(postId, text) {
    try {
      const response = await API.post(`/posts/${postId}/comments`, {
        text,
      });

      const updatedPost = formatPost(response.data.post);

      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (error) {
      alert(error.response?.data?.message || "Comment failed");
    }
  }

  function saveEdit(updatedPost) {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setEditingPost(null);
  }

  function updateUserEverywhere(updatedUser) {
    onUpdateUser(updatedUser);

    setPosts(
      posts.map((post) =>
        post.authorEmail === updatedUser.email
          ? {
              ...post,
              authorName: updatedUser.name,
              authorAvatar: updatedUser.avatar,
              authorProfileImage: updatedUser.profileImage || "",
              username: makeUsername(updatedUser.name),
            }
          : post
      )
    );
  }

  return (
    <section className="dashboard">
      <div className="app-bg-lines"></div>

      <Sidebar
        page={page}
        setPage={setPage}
        onLogout={onLogout}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <MobileNav
        page={page}
        setPage={setPage}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <div className="main-content">
        {page === "feed" && (
          <Feed
            posts={posts}
            user={user}
            onDelete={deletePost}
            onEdit={setEditingPost}
            onComment={addComment}
            loading={loadingPosts}
            feedMode={feedMode}
            setFeedMode={setFeedMode}
          />
        )}

        {page === "create" && <CreatePost onCreate={createPost} />}

        {page === "users" && <ExploreUsers />}

        {page === "requests" && <FriendRequests />}

        {page === "friends" && <MyFriends />}

        {page === "profile" && (
          <Profile
            user={user}
            posts={posts}
            onUpdateUser={updateUserEverywhere}
          />
        )}
      </div>

      {editingPost && (
        <EditModal
          editingPost={editingPost}
          setEditingPost={setEditingPost}
          onSave={saveEdit}
        />
      )}
    </section>
  );
}

export default function App() {
  const [showEntry, setShowEntry] = useState(true);
  const [authMode, setAuthMode] = useState("login");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("openmind-theme") || "dark";
  });

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("openmind-token");
    const savedUser = localStorage.getItem("openmind-user");

    if (token && savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  useEffect(() => {
    localStorage.setItem("openmind-theme", theme);

    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [theme]);

  function login(userData) {
    setUser(userData);
  }

  function updateUser(userData) {
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("openmind-token");
    localStorage.removeItem("openmind-user");
    setUser(null);
  }

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <AnimatePresence>
        {showEntry && <EntryScreen onFinish={() => setShowEntry(false)} />}
      </AnimatePresence>

      {!showEntry && !user && authMode === "login" && (
        <Login
          onLogin={login}
          onSwitchRegister={() => setAuthMode("register")}
        />
      )}

      {!showEntry && !user && authMode === "register" && (
        <Register onRegister={login} onSwitchLogin={() => setAuthMode("login")} />
      )}

      {!showEntry && user && (
        <Dashboard
          user={user}
          onLogout={logout}
          onUpdateUser={updateUser}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
    </>
  );
}