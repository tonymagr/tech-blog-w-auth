const router = require('express').Router();
const {Blogpost, Comment} = require('../models');

// GET all blog posts for homepage
router.get('/', async (req, res) => {
  // try {
  //   const dbBlogData = await Blogpost.findAll();

  //   const blogPosts = dbBlogData.map((blogPost) =>
  //     blogPost.get({plain: true})
  //   );
  //   // Send over the 'loggedIn' session variable to the 'homepage' template
  //   res.render('homepage', {
  //     blogPosts,
  //     loggedIn: req.session.loggedIn,
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
  try {
    const dbBlogData = await Blogpost.findAll();
    const blogPosts = dbBlogData.map((blogPost) => blogPost.get({ plain: true }));
    res.render('homepage', {
      blogPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
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

module.exports = router;