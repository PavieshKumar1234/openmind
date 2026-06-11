import { useState } from "react";
import { motion } from "framer-motion";

function Login({ onLogin, onSwitchRegister }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      name: "OpenMind User",
      email: form.email,
      avatar: "OU",
      bio: "I love sharing ideas and stories.",
    };

    onLogin(userData);
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
          Welcome back to your ideas
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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

          <button className="w-full btn-primary blue-glow">Login</button>
        </form>

        <button
          onClick={onSwitchRegister}
          className="mt-5 w-full text-sm text-sky-300"
        >
          New to OpenMind? Register
        </button>
      </motion.div>
    </section>
  );
}

export default Login;