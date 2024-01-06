const sequelize = require('../config/connection');
const seedBlogPost = require('./blogPostData');
const seedComment = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBlogPost();

  await seedComment();

  process.exit(0);
};

seedAll();
