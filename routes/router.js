const router = require('express').Router();

const userRouter = require('./usersRouter');
const moviesRouter = require('./moviesRouter');
const badRoute = require('../controllers/404page');

router.use(userRouter);
router.use(moviesRouter);

router.use('*', badRoute);

module.exports = router;
