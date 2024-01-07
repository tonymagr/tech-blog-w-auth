const router = require('express').Router();
const {UserAuth} = require('../../models');

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
      req.session.userNm = dbUserData.get({plain: true});
      console.log('userNm', req.session.userNm);
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await UserAuth.findOne({
      where: {
        username: req.body.user,
      },
    });
    console.log('dbUserData', dbUserData)
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
      req.session.userNm = dbUserData.get({plain: true});
      console.log('userNm', req.session.userNm);
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