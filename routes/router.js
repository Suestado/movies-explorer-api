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

// # создаёт пользователя с переданными в теле
// # email, password и name
router.post('/signup', validateUserDataJoi, createUser);

// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
router.post('/signin', validateUserDataJoi, logIn);

router.use(auth);

router.get('/users/me', findUserMe);
router.get('/movies', getMovie);
router.post('/movies', validateMovieDataJoi, createMovie);
router.patch('/users/me', validateUserUpdateJoi, updateUserInfo);
router.delete('/movies/:_id', validateMovieGetByIDJoi, deleteMovie);

module.exports = router;