import { useState } from "react";

function CreatePost({ user, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const newPost = {
      id: Date.now(),
      title: form.title,
      content: form.content,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      authorName: user.name,
      authorEmail: user.email,
      authorAvatar: user.avatar,
      username: "@" + user.name.toLowerCase().replaceAll(" ", ""),
      createdAt: "Now",
      comments: [],
    };

    onCreate(newPost);

    setForm({
      title: "",
      content: "",
      image: "",
    });
  }

  return (
    <main>
      <h2 className="text-4xl font-black">Create Post</h2>

      <p className="text-slate-400 mt-2">
        Turn your thoughts into a professional blog post.
      </p>

      <form onSubmit={handleSubmit} className="glass mt-8 rounded-3xl p-6 space-y-5">
        <input
          className="input-box"
          placeholder="Post title"
          required
          value={form.title}
          onChange={(event) =>
            setForm({ ...form, title: event.target.value })
          }
        />

        <input
          className="input-box"
          placeholder="Image URL"
          value={form.image}
          onChange={(event) =>
            setForm({ ...form, image: event.target.value })
          }
        />

        <textarea
          className="input-box min-h-52 resize-none"
          placeholder="Write your blog content..."
          required
          value={form.content}
          onChange={(event) =>
            setForm({ ...form, content: event.target.value })
          }
        />

        <button className="btn-primary blue-glow">Publish Post</button>
      </form>
    </main>
  );
}

export default CreatePost;