import PostCard from "../components/PostCard";

function Feed({ posts, currentUser, onDelete, onEdit, onComment }) {
  return (
    <main className="space-y-8">
      <div>
        <h2 className="text-4xl font-black">Open Feed</h2>

        <p className="text-slate-400 mt-2">
          Discover thoughts, stories, and ideas from the community.
        </p>
      </div>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={currentUser}
          onDelete={onDelete}
          onEdit={onEdit}
          onComment={onComment}
        />
      ))}
    </main>
  );
}

export default Feed;