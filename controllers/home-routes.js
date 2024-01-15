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

// GET all blog posts for Your Dashboard, only posts for logged in user (Dashboard view)
router.get('/dashboardblogpost', async (req, res) => {
  // If the user is logged in, find own blogposts and render on page
  if (req.session.loggedIn) {
    try {
      const dbBlogData = await Blogpost.findAll({
        where: {
          user_name: req.session.user
        }
      });

      const blogPosts = dbBlogData.map((blogPost) =>
        blogPost.get({plain: true})
      );
      // Send over the 'loggedIn' session variable to the 'dashboard' template
      res.render('dashboard-blog-post', {
        blogPosts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    // Else user is not logged in. Redirect to home page.
    res.redirect('/');
    return;
  }
});

// Render page to enter new blog post (Dashboard view)
router.get('/newblogpost', async (req, res) => {
  if (req.session.loggedIn) {
    res.render('new-blog-post', {
      loggedIn: req.session.loggedIn,
      activeUser: req.session.user,
    });
  } else {
    // Else user is not logged in. Redirect to home page.
    res.redirect('/');
    return;
  }
});

// CREATE new blog post (Dashboard view)
router.post('/newblogpost', async (req, res) => {
  try {
    const postData = await Blogpost.create({
      title: req.body.title,
      contents: req.body.contents,
      user_name: req.body.userName,
      post_date: req.body.postDate,
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render page to update or delete blog post. "id" is blogpost ID (Dashboard view)
router.get('/editdeleteblogpost/:id', async (req, res) => {
  try {
    const dbBlogData = await Blogpost.findByPk(req.params.id);

    const blogPost = dbBlogData.get({plain: true});
    // Send over the 'loggedIn' and 'activeUser' session variables to the template
    res.render('edit-delete-blog-post', {
      blogPost,
      loggedIn: req.session.loggedIn,
      activeUser: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update blog post (Dashboard view)
router.put('/editdeleteblogpost/:id', async (req, res) => {
  try {
    const blogPostUpd = await Blogpost.update(
    {
      title: req.body.title,
      contents: req.body.contents,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogPostUpd);
  } catch (err) {
      res.status(500).json(err);
    };
});

// Update blog post (Dashboard view)
router.delete('/editdeleteblogpost/:id', async (req, res) => {
  try {
    const blogPostDel = await Blogpost.destroy(
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogPostDel);
  } catch (err) {
      res.status(500).json(err);
    };
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