function EditPost({ editingPost, setEditingPost, onSave }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSave(editingPost);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="glass rounded-3xl p-6 w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-black">Edit Post</h2>

        <input
          className="input-box"
          value={editingPost.title}
          onChange={(event) =>
            setEditingPost({
              ...editingPost,
              title: event.target.value,
            })
          }
        />

        <input
          className="input-box"
          value={editingPost.image}
          onChange={(event) =>
            setEditingPost({
              ...editingPost,
              image: event.target.value,
            })
          }
        />

        <textarea
          className="input-box min-h-40 resize-none"
          value={editingPost.content}
          onChange={(event) =>
            setEditingPost({
              ...editingPost,
              content: event.target.value,
            })
          }
        />

        <div className="flex gap-3">
          <button className="btn-primary">Save</button>

          <button
            type="button"
            onClick={() => setEditingPost(null)}
            className="btn-dark"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;