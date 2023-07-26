const userRouter = require('express').Router();

const auth = require('../middlewares/auth');
const validateUserDataJoi = require('../middlewares/validateUserDataJoi');
const validateUserUpdateJoi = require('../middlewares/validateUserUpdateJoi');

const {
  logIn,
  logOut,
  createUser,
  findUserMe,
  updateUserInfo,
} = require('../controllers/users');

userRouter.post('/signup', validateUserDataJoi, createUser);
userRouter.post('/signin', validateUserDataJoi, logIn);

userRouter.use(auth);

userRouter.get('/users/me', findUserMe);
userRouter.patch('/users/me', validateUserUpdateJoi, updateUserInfo);

userRouter.get('/logout', logOut);

module.exports = userRouter;
