function Profile({ user, posts }) {
  const myPosts = posts.filter((post) => post.authorEmail === user.email);

  const totalComments = myPosts.reduce(
    (total, post) => total + post.comments.length,
    0
  );

  return (
    <main>
      <h2 className="text-4xl font-black">Profile</h2>

      <section className="glass mt-8 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-28 w-28 rounded-full bg-sky-400 text-slate-950 text-3xl font-black flex items-center justify-center blue-glow">
            {user.avatar}
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black">{user.name}</h3>

            <p className="text-slate-400">{user.email}</p>

            <p className="text-slate-300 mt-3">{user.bio}</p>

            <div className="mt-5 flex justify-center md:justify-start gap-6">
              <div>
                <p className="text-2xl font-black text-sky-300">
                  {myPosts.length}
                </p>
                <p className="text-sm text-slate-400">Posts</p>
              </div>

              <div>
                <p className="text-2xl font-black text-sky-300">
                  {totalComments}
                </p>
                <p className="text-sm text-slate-400">Comments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <h3 className="text-2xl font-black mt-8">My Posts</h3>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        {myPosts.length === 0 && (
          <p className="text-slate-400">You have not created any posts yet.</p>
        )}

        {myPosts.map((post) => (
          <div key={post.id} className="glass rounded-3xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h4 className="font-black text-xl">{post.title}</h4>

              <p className="text-slate-400 mt-2 line-clamp-2">
                {post.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Profile;