const { CastError, ValidationError } = require('mongoose').MongooseError;
const BadRequest = require('../utils/errors/BadRequest');
const NotFound = require('../utils/errors/NotFound');
const ForbiddenRequest = require('../utils/errors/ForbiddenRequest');
const {
  statusOk,
  statusCreated,
} = require('../utils/constants');

const Movie = require('../models/movie');

const getMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({})
    .then((movies) => {
      res.status(statusOk).send(movies.filter((movie) => movie.owner.toString() === userId));
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(statusCreated).send(movie);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Фильм не может быть сохранен. Проверьте введенные данные'));
      } else {
        next(err);
      }
    });
};

function processErrors(err, req, res, next) {
  if (err instanceof CastError) {
    next(new BadRequest('Введен некорректный ID фильма'));
  } else {
    next(err);
  }
}

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;

  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм не был найден');
      } else if (movie.owner.valueOf() !== userId) {
        throw new ForbiddenRequest('Нет прав на удаление фильма');
      } else {
        return Movie.findByIdAndRemove(_id)
          .then((deletedMovie) => {
            res.status(statusOk).send(deletedMovie);
          });
      }
    })
    .catch((err) => {
      processErrors(err, req, res, next);
    });
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
