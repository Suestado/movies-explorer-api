const router = require('express').Router();

const auth = require('../middlewares/auth');
const validateUserDataJoi = require('../middlewares/validateUserDataJoi');
const validateUserUpdateJoi = require('../middlewares/validateUserUpdateJoi');
const validateMovieDataJoi = require('../middlewares/validateMovieDataJoi');
const validateMovieGetByIDJoi = require('../middlewares/validateMovieGetByIDJoi');

const {
  logIn,
  logOut,
  createUser,
  findUserMe,
  updateUserInfo,
} = require('../controllers/users');

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const badRoute = require('../controllers/404page');

router.post('/signup', validateUserDataJoi, createUser);
router.post('/signin', validateUserDataJoi, logIn);

router.use(auth);

router.get('/users/me', findUserMe);
router.patch('/users/me', validateUserUpdateJoi, updateUserInfo);
router.get('/movies', getMovie);
router.post('/movies', validateMovieDataJoi, createMovie);
router.delete('/movies/:_id', validateMovieGetByIDJoi, deleteMovie);

router.get('/logout', logOut);

router.use('*', badRoute);

module.exports = router;
