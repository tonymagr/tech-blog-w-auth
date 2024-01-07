const router = require('express').Router();
const {Blogpost, Comment} = require('../models');

// GET all blog posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blogpost.findAll();

    const blogPosts = dbBlogData.map((blogPost) =>
      blogPost.get({plain: true})
    );
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('homepage', {
      blogPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog post
router.get('/blogpost/:id', async (req, res) => {
  try {
    const dbBlogData = await Blogpost.findByPk(req.params.id,
      {
        include: [
          {
            model: Comment,
            attributes: [
              'id',
              'comment_text',
              'user_name',
              'comment_date',
            ],
          },
        ],
      });

    const blogPost = dbBlogData.get({plain: true});
    // Send over the 'loggedIn' session variable to the 'blogpost' template
    res.render('blog-post', {
      blogPost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET one painting
// router.get('/painting/:id', async (req, res) => {
//   try {
//     const dbPaintingData = await Painting.findByPk(req.params.id);
//     const painting = dbPaintingData.get({plain: true});
//     // Send over the 'loggedIn' session variable to the 'homepage' template
//     res.render('painting', {painting, loggedIn: req.session.loggedIn,});
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

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

module.exports = router;