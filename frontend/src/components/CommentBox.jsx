import { useState } from "react";
import { Send } from "lucide-react";

function CommentBox({ onSend }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    onSend(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
      <input
        className="input-box flex-1"
        placeholder="Write a comment..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <button className="rounded-2xl bg-sky-400 px-4 text-slate-950 font-bold">
        <Send size={18} />
      </button>
    </form>
  );
}

export default CommentBox;