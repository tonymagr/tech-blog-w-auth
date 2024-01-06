const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'Javascript rules',
    user_name: 'Geek 1',
    comment_date: 'December 1, 2023 07:00:00',
    blogpost_id: 3,
  },
  {
    comment_text: 'HTML rules',
    user_name: 'Geek 2',
    comment_date: 'December 2, 2023 07:00:00',
    blogpost_id: 1,
  },
  {
    comment_text: 'CSS rules',
    user_name: 'Geek 3',
    comment_date: 'December 3, 2023 07:00:00',
    blogpost_id: 2,
  },
  {
    comment_text: 'I wanna code',
    user_name: 'Geek 4',
    comment_date: 'December 4, 2023 07:00:00',
    blogpost_id: 1,
  },
  {
    comment_text: 'I really wanna code',
    user_name: 'Geek 5',
    comment_date: 'December 5, 2023 07:00:00',
    blogpost_id: 2,
  },
  {
    comment_text: 'I really really wanna code',
    user_name: 'Geek 6',
    comment_date: 'December 6, 2023 07:00:00',
    blogpost_id: 3,
  },
  {
    comment_text: 'I also would like to code',
    user_name: 'Geek 7',
    comment_date: 'December 7, 2023 07:00:00',
    blogpost_id: 1,
  },
  {
    comment_text: 'I will just watch you code',
    user_name: 'Geek 8',
    comment_date: 'December 8, 2023 07:00:00',
    blogpost_id: 3,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
