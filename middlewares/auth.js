require('dotenv').config();
const jwt = require('jsonwebtoken');
const DEV_SECRET_KEY = require('../utils/constants');
const StatusDenied = require('../utils/errors/StatusDenied');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new StatusDenied('Необходима авторизация. Токен не найден');
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? `${JWT_SECRET}` : `${DEV_SECRET_KEY}`);
  } catch (err) {
    next(new StatusDenied('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
