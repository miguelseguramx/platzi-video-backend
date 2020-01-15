const boom = require('@hapi/boom')
const { config } = require('../../config/index')

function withErrorStack(error, stack) {
  if(config.dev){
    return { ...error, stack }
  }

  return error;
}

function logError(err, req, res, next) { // eslint-disable-line
  console.log(err); // eslint-disable-line
  next(err)
}

function wrapError(err, req, res, next) { // eslint-disable-line
  if(!err.isBoom){
    next(boom.badImplementation(err))
  }
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  const { output: { statusCode, payload } } = err

  res.status(statusCode)
  res.json(withErrorStack(payload, err.stack))
}


module.exports = {
  logError,
  wrapError,
  errorHandler
}