const router = require('express').Router();
const {UserAuth} = require('../../models');

// Signup route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('signup');
});

// CREATE new user
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await UserAuth.create({
      username: req.body.user,
      password: req.body.password,
    });

    // Set up sessions with the 'loggedIn' variable
    req.session.save(() => {
      // Set the 'loggedIn' session variable to 'true'
      req.session.loggedIn = true;
      req.session.user = req.body.user;
      req.session.userData = dbUserData.get({plain: true});
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await UserAuth.findOne({
      where: {
        username: req.body.user,
      },
    });
    if (!dbUserData) {
      res
        .status(400)
        .json({message: 'Incorrect username or password. Please try again!'});
      return;
    }
    // Await has no effect on the type of this expression.
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({message: 'Incorrect username or password. Please try again!'});
      return;
    }

    req.session.save(() => {
      // Once the user successfully logs in, set up sessions with the 'loggedIn' variable
      req.session.loggedIn = true;
      req.session.user = req.body.user;
      req.session.userData = dbUserData.get({plain: true});
      res
        .status(200)
        .json({user: dbUserData, message: 'You are now logged in!'});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, the session is destroyed
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;