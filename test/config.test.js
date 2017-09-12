'use strict'

const test = require('ava').test
const envCache = JSON.stringify(process.env)

test.beforeEach(t => {
  process.env.MONGOURI = 'a'
})

test.afterEach(() => {
  process.env = JSON.parse(envCache)
  delete require.cache[require.resolve('./../src/config')]
})

test('should set env', t => {
  // Arrange
  process.env.NODE_ENV = 'develop'
  const expected = 'develop'
  // Act
  let result = require('./../src/config').env
  // Assert
  t.is(result, expected)
})

test('should set env default', t => {
  // Arrange
  delete process.env.NODE_ENV
  const expected = 'production'
  // Act
  let result = require('./../src/config').env
  // Assert
  t.is(result, expected)
})

test('should set port default', t => {
  // Arrange
  const expected = 8080
  // Act
  let result = require('./../src/config').port
  // Assert
  t.is(result, expected)
})

test('should set port as int', t => {
  // Arrange
  process.env.PORT = '9090'
  const expected = 9090
  // Act
  let result = require('./../src/config').port
  // Assert
  t.is(result, expected)
})

test('should throw if port isnt int', t => {
  // Arrange
  process.env.PORT = 'abcd'
  // Assert
  t.throws(function () {
    // Act
    require('./../src/config')
  })
})

test('should set port', t => {
  // Arrange
  process.env.PORT = 9090
  const expected = 9090
  // Act
  let result = require('./../src/config').port
  // Assert
  t.is(result, expected)
})

test('should set mongouri', t => {
  // Arrange
  process.env.MONGOURI = 'some url'
  const expected = 'some url'
  // Act
  let result = require('./../src/config').mongodb.uri
  // Assert
  t.is(result, expected)
})

test('should require mongouri', t => {
  // Arrange
  delete process.env.MONGOURI
  // Assert
  t.throws(function () {
    // Act
    require('./../src/config')
  })
})
