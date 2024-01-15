const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#blog-comment').value.trim();
  const userName = document.querySelector('#comm-username').innerHTML;
  const blogId = document.querySelector('#comm-blogid').innerHTML;
  const commentDate = new Date();

  if (comment && userName && blogId) {
    const response = await fetch(`/api/blogs/comment/${blogId}`, {
      method: 'POST',
      body: JSON.stringify({ comment, userName, commentDate, blogId}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert('Comment created.');
      document.location.replace(`/blogpost/${blogId}`);
    } else {
      alert('Failed to create comment.');
    }
  }
};

document
  .querySelector('#comment-form')
  .addEventListener('submit', newCommentHandler);