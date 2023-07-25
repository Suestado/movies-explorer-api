const { celebrate, Joi, Segments } = require('celebrate');
const { emailRegExp } = require('../utils/constants');

const validateUserUpdateJoi = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().pattern(emailRegExp),
    name: Joi.string().min(2).max(30),
  })
});

module.exports = validateUserUpdateJoi;
