import { useState } from "react";
import { motion } from "framer-motion";

function Register({ onRegister, onSwitchLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function getAvatar(name) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      name: form.name,
      email: form.email,
      avatar: getAvatar(form.name),
      bio: "I love sharing ideas and stories.",
    };

    onRegister(userData);
  }

  return (
    <section className="min-h-screen neon-bg flex items-center justify-center px-4 relative">
      <div className="neon-lines"></div>

      <motion.div
        className="glass relative z-10 w-full max-w-md rounded-3xl p-8"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <h2 className="text-4xl font-black neon-title text-center">
          OpenMind
        </h2>

        <p className="text-center text-slate-400 mt-2">
          Create your writing identity
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            className="input-box"
            placeholder="Full name"
            required
            value={form.name}
            onChange={(event) =>
              setForm({ ...form, name: event.target.value })
            }
          />

          <input
            className="input-box"
            placeholder="Email address"
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />

          <input
            className="input-box"
            placeholder="Password"
            type="password"
            required
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />

          <button className="w-full btn-primary blue-glow">
            Create Account
          </button>
        </form>

        <button
          onClick={onSwitchLogin}
          className="mt-5 w-full text-sm text-sky-300"
        >
          Already have an account? Login
        </button>
      </motion.div>
    </section>
  );
}

export default Register;