const updateBlogPostHandler = async (event) => {
  const title = document.querySelector('#blog-title').value;
  const contents = document.querySelector('#blog-post').value;
  const id = document.querySelector('#post-blogid').innerHTML;

  const response = await fetch(`/api/dashboard/editdeleteblogpost/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      contents,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    alert('Blog post updated.');
    document.location.replace('/api/dashboard/blogpost');
  } else {
    alert('Failed to update blog post.');
  }
};

const deleteBlogPostHandler = async (event) => {
  const id = document.querySelector('#post-blogid').innerHTML;

  const response = await fetch(`/api/dashboard/editdeleteblogpost/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    alert('Blog post deleted.');
    document.location.replace('/api/dashboard/blogpost');
  } else {
    alert('Failed to delete blog post.');
  }
};

function identifyButton(event) {
  event.preventDefault();
  // Capture button value, update or delete
  const sourceButton = event.submitter.value;

  if (sourceButton === 'update') {
    updateBlogPostHandler();
  } else if (sourceButton === 'delete') {
    deleteBlogPostHandler();
  } else {
    alert('Button not found.');
  }
}

document
  .querySelector('#edit-blog-form')
  .addEventListener('submit', identifyButton);