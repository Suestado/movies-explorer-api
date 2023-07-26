const moviesRouter = require('express').Router();

const validateMovieDataJoi = require('../middlewares/validateMovieDataJoi');
const validateMovieGetByIDJoi = require('../middlewares/validateMovieGetByIDJoi');

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovie);
moviesRouter.post('/movies', validateMovieDataJoi, createMovie);
moviesRouter.delete('/movies/:_id', validateMovieGetByIDJoi, deleteMovie);

module.exports = moviesRouter;
