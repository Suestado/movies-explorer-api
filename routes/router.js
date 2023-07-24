const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  logIn,
  logOut,
  createUser,
  findUserMe,
  updateUserInfo,
} = require('../controllers/users');

// # создаёт пользователя с переданными в теле
// # email, password и name
router.post('/signup', createUser);

// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
router.post('/signin', logIn);

router.use(auth);

router.get('/users/me', findUserMe);
router.get('/movies');
router.post('/movies');
router.patch('/users/me', updateUserInfo);
router.delete('/movies/_id');

module.exports = router;