const { Blogpost } = require('../models');

const blogPostData = [
  {
    title: 'HTML post',
    contents: 'HTML defines front-end content.',
    user_name: 'Michael Jordan',
    post_date: 'October 1, 2023 07:00:00',
  },
  {
    title: 'CSS post',
    contents: 'CSS styles front-end content.',
    user_name: 'Scottie Pippen',
    post_date: 'November 1, 2023 14:00:00',
  },
  {
    title: 'Javascript post',
    contents: 'Javascript is the underlying web development language for front-end and back-end.',
    user_name: 'Horace Grant',
    post_date: 'October 31, 2023 07:00:00',
  },
  {
    title: 'Own post',
    contents: 'One of my own posts',
    user_name: 'tony',
    post_date: 'January 13, 2024 20:30:00',
  },
];

const seedBlogPost = () => Blogpost.bulkCreate(blogPostData);

module.exports = seedBlogPost;
