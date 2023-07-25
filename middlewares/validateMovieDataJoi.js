const { celebrate, Joi, Segments } = require('celebrate');
const { linkRegExp } = require('../utils/constants');

const validateMovieDataJoi = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegExp),
    trailerLink: Joi.string().required().pattern(linkRegExp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(linkRegExp),
    movieId: Joi.number().required(),
  }),
});

module.exports = validateMovieDataJoi;
