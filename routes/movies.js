const express = require('express')
// const { moviesMock } = require('../utils/mocks/movies')
const MoviesService = require('../services/movies')

const {
  createMovieSchema,
  updateMovieSchema,
  movieIdSchema
} = require ('../utils/schemas/movies')

const validationHandler = require('../utils/middleware/validationHandler')

const cacheResponse = require('../utils/cacheResponse')
const { 
  FIVE_MINUTES_IN_SECONDS, 
  SIXTY_MINUTES_IN_SECONDS 
} = require('../utils/time')

// La unica responsabilidad de las rutas es declararlas y extraer los parametros 
// que le pases
function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService()

  router.get('/', async function(req, res, next){
    // La siguiente linea agrega cache
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query

    try {
      const movies = await moviesService.getMovies({ tags })
      // throw new Error('Error getting movies');
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (error) {
      next(error)
    }
  })

  // Notese que el middlewere de la validacion de formato va a 
  // estar entre la ruta y la definicon de esta
  router.get(
    '/:movieId', 
    validationHandler({ movieId: movieIdSchema }, 'params'), 
    async function(req, res, next){
      // La siguiente linea grega cache
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { movieId } = req.params
      try {
        const movies = await moviesService.getMovie({ movieId })

        res.status(200).json({
          data: movies,
          message: 'movie retrieved'
        })
      } catch (error) {
        next(error)
      }
  })

  router.post(
    '/',
    validationHandler(createMovieSchema), 
    async function(req, res, next){
      const { body: movie } = req
      try {
        const createMovieId = await moviesService.createMovie({ movie })
  
        res.status(201).json({
          data: createMovieId,
          message: 'movies created'
        })
      } catch (error) {
        next(error)
      }
  })

  router.put(
    '/:movieId', 
    validationHandler({ movieId: movieIdSchema }, 'params'), 
    validationHandler(updateMovieSchema), 
    async function(req, res, next){
      const { movieId } = req.params
      const { body: movie } = req
      try {
        const updatedMovieId = await moviesService.updateMovie({ 
          movieId,
          movie
        })
        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated'
        })
      } catch (error) {
        next(error)
      }
  })

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function(req, res, next){
      const { movieId } = req.params
      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId })
  
        res.status(200).json({
          data: deletedMovieId,
          message: 'movie deleted'
        })
      } catch (error) {
        next(error)
      }
  })
}

module.exports = moviesApi