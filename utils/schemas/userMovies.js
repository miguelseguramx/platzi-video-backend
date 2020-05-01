const joi = require('@hapi/joi')

const { movieIdSchema } = require('./movies')
const { userIdSchema } = require('./users')

const userMovieSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createUserIdSchema = {
  userId: userIdSchema,
  movieIdSchema: movieIdSchema,
}

module.exports = {
  userMovieSchema,
  createUserIdSchema,
}
