const express = require('express');
const app = express();

const { config } = require('./config/index')
const moviesApi = require('./routes/movies.js')

const { 
  logError, 
  wrapError, 
  errorHandler } = require('./utils/middleware/errorHandlers')

const notFoundHandler = require('./utils/middleware/notFoundHandler')
  
// Body parser
app.use(express.json());

// Routes
moviesApi(app)

// Catch 404
app.use(notFoundHandler)

// Error handlers
app.use(logError)
app.use(wrapError)
app.use(errorHandler)

app.listen(config.port, function () {
  console.log(`Listenign http://localhost:${config.port}`) // eslint-disable-line
});