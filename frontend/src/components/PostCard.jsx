import { motion } from "framer-motion";
import { MessageCircle, Trash2, Edit } from "lucide-react";
import CommentBox from "./CommentBox";

function PostCard({ post, currentUser, onDelete, onEdit, onComment }) {
  const isOwner = post.authorEmail === currentUser.email;

  return (
    <motion.article
      className="glass rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-sky-400 text-slate-950 font-black flex items-center justify-center">
          {post.authorAvatar}
        </div>

        <div>
          <h3 className="font-bold">{post.authorName}</h3>
          <p className="text-sm text-slate-400">
            {post.username} · {post.createdAt}
          </p>
        </div>

        {isOwner && (
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => onEdit(post)}
              className="p-2 rounded-xl hover:bg-slate-800 text-sky-300"
            >
              <Edit size={18} />
            </button>

            <button
              onClick={() => onDelete(post.id)}
              className="p-2 rounded-xl hover:bg-red-500/10 text-red-300"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-80 object-cover"
      />

      <div className="p-6">
        <h2 className="text-2xl font-black">{post.title}</h2>

        <p className="text-slate-300 mt-3 leading-relaxed">{post.content}</p>

        <div className="mt-6 border-t border-slate-700 pt-4">
          <div className="flex items-center gap-2 text-sky-300 font-semibold">
            <MessageCircle size={19} />
            Comments
          </div>

          <div className="mt-4 space-y-3">
            {post.comments.length === 0 && (
              <p className="text-slate-500 text-sm">
                No comments yet. Be the first to comment.
              </p>
            )}

            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-slate-950/60 rounded-2xl px-4 py-3"
              >
                <span className="font-bold text-sky-300">
                  {comment.user}:{" "}
                </span>
                <span className="text-slate-300">{comment.text}</span>
              </div>
            ))}
          </div>

          <CommentBox onSend={(text) => onComment(post.id, text)} />
        </div>
      </div>
    </motion.article>
  );
}

export default PostCard;