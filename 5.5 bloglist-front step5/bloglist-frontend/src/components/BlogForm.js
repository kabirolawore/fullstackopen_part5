const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newAuthor,
  newTitle,
  newUrl,
}) => {
  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          author:
          <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
