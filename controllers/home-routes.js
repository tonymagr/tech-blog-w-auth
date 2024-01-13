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

// Render blog post with its comments
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

// Render page to enter new blog post comment. "id" is the blogpost id
router.get('/blogpostcomment/:id', async (req, res) => {
  try {
    const dbBlogData = await Blogpost.findByPk(req.params.id);

    const blogPost = dbBlogData.get({plain: true});
    console.log('req.session.user', req.session.user);
    // Send over the 'loggedIn' session variable to the 'blogpost' template
    res.render('blog-post-comment', {
      blogPost,
      loggedIn: req.session.loggedIn,
      activeUser: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new comment
router.post('/blogpostcomment/:id', async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_text: req.body.comment,
      user_name: req.body.userName,
      comment_date: req.body.commentDate,
      blogpost_id: req.body.blogId,
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render 'comment' which is a blog post and its comments
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