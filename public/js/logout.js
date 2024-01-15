const logoutLink = document.querySelector('#logout-link');

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
    alert('You are now logged out.')
  } else {
    alert('Failed to log out.');
  }
}

logoutLink.addEventListener('click', logout);