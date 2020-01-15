// Aqui vamos a utilizar tdd
// La tecnica rtd consiste en crear primero lso test y luego la funcionalidad, 
// hay algunos casos donde vale la pena usarla, es cuando se tiene muy clara cual es la 
// logica de negocio, este metodo tambien se podria aplicar cuando tienes un bug

// TDD es test driven development.
// En otras palabras: crear primero las pruebas que hay que superar y después
// desarrollar el código.
// El profesor considera magnífico usar esto cuando se tiene muy claro la lógica de negocio.
// Si no lo tienes claro no es recomendable.
// También es recomendable hacerlo cuando tienes un bug para que tu solución de él perdure en el tiempo.

const assert = require('assert')
const buildMessage = require('../utils/buildMessage')

describe.only('utils -buildMessage', function(){
  describe('when receives an entity and an action', function(){
    it('should return the respective message', function(){
      const result = buildMessage('movie', 'create')
      const expect = "movie created"
      assert.strictEqual(result, expect)
    })
  })

  describe('when recives an entity and an action and is a list', function(){
    it('should return the respective message with the entity in plural', function(){
      const result = buildMessage('movie', 'list')
      const expected = 'movies listed'
      assert.strictEqual(result, expected);
    })
  })
})
