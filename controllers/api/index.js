const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
