const NotFound = require('../utils/errors/NotFound');

function throwError() {
  throw new NotFound('Страница не найдена');
}

const badRoute = (req, res, next) => {
  try {
    throwError();
  } catch (err) {
    next(err);
  }
};

module.exports = badRoute;
