// Con sinon puedes testear si en realidad llamo 
// los metodos de las respectivas librerias
const sinon = require('sinon')

const { moviesMock, filteredMoviesMock } = require('./movies')

const getAllStub = sinon.stub()
getAllStub.withArgs('movies').resolves(moviesMock)

const tagQuery = { tags: { $in: ["Drama"]} }
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock("Drama"))

const createSub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock{
  getAll(collection, query){
    return getAllStub(collection, query)
  }

  create(collection, data){
    return createSub(collection,data)
  }
}

module.exports = {
  getAllStub,
  createSub,
  MongoLibMock
}