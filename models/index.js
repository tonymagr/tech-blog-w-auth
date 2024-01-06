const UserAuth = require('./UserAuth');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

Blogpost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'blogpost_id',
});

module.exports = { UserAuth, Blogpost, Comment };
