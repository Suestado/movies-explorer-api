const { Schema, model } = require('mongoose');

const filmSchema = new Schema({
  country: {
    type: 'string',
    required: true,
  },
  director: {
    type: 'string',
    required: true,
  },
  duration: {
    type: 'number',
    required: true,
  },
  year: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  image: {
    type: 'string',
    required: true,
    match: [/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi, 'Неверный формат ссылки'],
  },
  trailerLink: {
    type: 'string',
    required: true,
    match: [/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi, 'Неверный формат ссылки'],
  },
  thumbnail: {
    type: 'string',
    required: true,
    match: [/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi, 'Неверный формат ссылки'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: 'number',
    required: true,
  },
  nameRU: {
    type: 'string',
    required: true,
  },
  nameEN: {
    type: 'string',
    required: true,
  },
});

module.exports = model('film', filmSchema);
