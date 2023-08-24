require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { CastError, ValidationError } = require('mongoose').MongooseError;
const BadRequest = require('../utils/errors/BadRequest');
const NotFound = require('../utils/errors/NotFound');
const ConflictRequest = require('../utils/errors/ConflictRequest');
const {
  statusOk,
  statusCreated,
  statusModified,
} = require('../utils/constants');
const DEV_SECRET_KEY = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        email, password: hash, name,
      },
    ))
    .then((user) => {
      res.status(statusCreated).send(user);
    })
    .catch((err) => {
      if (err.errors?.email?.kind === 'unique') {
        next(new ConflictRequest('Пользователь с таким email уже существует'));
      } else if (err instanceof ValidationError) {
        next(new BadRequest('Пользователь не может быть создан. Проверьте введенные данные'));
      } else {
        next(err);
      }
    });
};

const logIn = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? `${JWT_SECRET}` : `${DEV_SECRET_KEY}`,
        { expiresIn: 3600 * 24 * 7 },
      );
      res.cookie(
        'jwt',
        token,
        {
          maxAge: 36000 * 24 * 7,
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        },
      );
      res.status(statusOk).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const findUserMe = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.status(statusOk).send(user);
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequest('Введен некорректный ID пользователя'));
      } else {
        next(err);
      }
    });
};

const logOut = (req, res) => {
  res
    .status(200)
    .clearCookie('jwt', {
      sameSite: 'none',
      secure: true,
    })
    .send({ message: 'logOut прошел успешно' });
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const newData = {
    email: req.body.email,
    name: req.body.name,
  };

  User.findByIdAndUpdate(
    userId,
    newData,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.status(statusModified).send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Ошибка обновления данных пользователя. Проверьте введенные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  logIn,
  logOut,
  findUserMe,
  updateUserInfo,
};
