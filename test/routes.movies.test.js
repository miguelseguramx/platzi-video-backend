const assert = require('assert') 
const proxyquire = require('proxyquire')

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies')
const testServer = require('../utils/testServer')

// Aqui abajo se van a testear todas las rutas y sus respuestas
describe('routes - movies', function(){
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  })

  const request = testServer(route)

  describe('GET /movies', function(){
    it('should respond with status 200', function(done){
      request.get('/api/movies').expect(200, done)
    })

    it('should respond with the lsit of movies', function(done){
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        })

        done()
      })
    })
  })
})
