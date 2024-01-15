const newBlogPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const contents = document.querySelector('#blog-post').value.trim();
  const userName = document.querySelector('#post-username').innerHTML;
  const postDate = new Date();

  if (title && contents && userName) {
    const response = await fetch('/api/dashboard/newblogpost', {
      method: 'POST',
      body: JSON.stringify({ title, contents, userName, postDate}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert('Blog post created.');
      document.location.replace('/api/dashboard/blogpost');
    } else {
      alert('Failed to create blog post.');
    }
  }
};

document
  .querySelector('#new-blog-form')
  .addEventListener('submit', newBlogPostHandler);