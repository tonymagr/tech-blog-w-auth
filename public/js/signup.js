const signupFormHandler = async (event) => {
  event.preventDefault();

  const usernameElem = document.querySelector('#user-signup');
  const passwordElem = document.querySelector('#password-signup');
  const user = usernameElem.value.trim();
  const password = passwordElem.value.trim();
  
  if (user && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ user, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
