import { useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const appTitle = "OPENMIND";

function EntryScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 7200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.section
      className="entry-wall fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.9 }}
    >
      <div className="entry-dark-overlay"></div>

      <div className="electric-line electric-line-one"></div>
      <div className="electric-line electric-line-two"></div>
      <div className="electric-line electric-line-three"></div>

      <div className="switch-box switch-left"></div>
      <div className="switch-box switch-right"></div>

      <div className="wire wire-left"></div>
      <div className="wire wire-right"></div>

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="openmind-neon-title">
          {appTitle.split("").map((letter, index) => (
            <motion.span
              key={index}
              className="openmind-letter"
              initial={{
                opacity: 0,
                y: 80,
                filter: "blur(18px)",
                textShadow: "0 0 0px #38bdf8",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                textShadow:
                  "0 0 8px #7dd3fc, 0 0 18px #38bdf8, 0 0 40px #0ea5e9, 0 0 80px #0284c7",
              }}
              transition={{
                delay: 1 + index * 0.16,
                duration: 0.55,
                ease: "easeOut",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="logo-board mx-auto mt-28"
          initial={{ opacity: 0, y: 35, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 3.1, duration: 0.8 }}
        >
          <Lightbulb size={44} className="text-sky-200" />
        </motion.div>

        <motion.p
          className="blog-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 0.7 }}
        >
          BLOG APP
        </motion.p>

        <motion.p
          className="entry-description"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.8 }}
        >
          Share your thoughts. Open your mind. Turn ideas into powerful stories.
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
          className="entry-btn"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 0.7 }}
        >
          Enter OpenMind
        </motion.button>
      </motion.div>
    </motion.section>
  );
}

export default EntryScreen;