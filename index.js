const express = require('express');
const app = express();
const helmet = require('helmet');

const { config } = require('./config/index')

const moviesApi = require('./routes/movies.js')
const userMoviesApi = require('./routes/userMovies')
const authApi = require('./routes/auth')

const { 
  logError, 
  wrapError, 
  errorHandler } = require('./utils/middleware/errorHandlers')

const notFoundHandler = require('./utils/middleware/notFoundHandler')
  
// Body parser
app.use(express.json());
app.use(helmet());

// Routes
moviesApi(app)
userMoviesApi(app)
authApi(app)


// Catch 404
app.use(notFoundHandler)

// Error handlers
app.use(logError)
app.use(wrapError)
app.use(errorHandler)

app.listen(config.port, function (err) {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
  console.log(`Listenign http://localhost:${config.port}`) // eslint-disable-line
});
