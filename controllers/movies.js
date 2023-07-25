const { CastError, ValidationError } = require('mongoose').MongooseError;
const BadRequest = require('../utils/errors/BadRequest');
const NotFound = require('../utils/errors/NotFound');
const {
  statusOk,
  statusCreated,
  statusModified,
} = require('../utils/constants');

const Movie = require('../models/movie');

const getMovie = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(statusOk).send(movies);
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
      console.log(err);
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

  Movie.findById(_id)
    .then((card) => {
      if (!card) {
        throw new NotFound('Фильм не был найден');
      } else {
        Movie.findByIdAndRemove(_id)
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