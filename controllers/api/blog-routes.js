const router = require('express').Router();
const {Blogpost, Comment} = require('../../models');

// Render page to enter new blog post comment. "id" is the blogpost id
router.get('/comment/:id', async (req, res) => {
    try {
      const dbBlogData = await Blogpost.findByPk(req.params.id);
  
      const blogPost = dbBlogData.get({plain: true});
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
  router.post('/comment/:id', async (req, res) => {
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

module.exports = router;