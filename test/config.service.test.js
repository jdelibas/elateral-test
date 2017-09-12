'use strict'

// Test modules
const test = require('ava')
const envCache = JSON.stringify(process.env)

test.beforeEach(t => {
  t.context.config = require('./../src/config.service')
})

test.afterEach(() => {
  process.env = JSON.parse(envCache)
  delete require.cache[require.resolve('./../src/config.service')]
})

test('should return value', t => {
  // Arrange
  process.env.SOME_ENV_VAR = 'abcd'
  const expected = 'abcd'
  // Act
  const result = t.context.config('SOME_ENV_VAR').exec()
  // Assert
  t.is(result, expected)
})

test('should not overwrite with default value', t => {
  // Arrange
  process.env.SOME_ENV_VAR = 'abcd'
  const expected = 'abcd'
  // Act
  const result = t.context.config('SOME_ENV_VAR')
    .default('some default value')
    .exec()
  // Assert
  t.is(result, expected)
})

test('should apply default value', t => {
  // Arrange
  const expected = 'some default value'
  // Act
  const result = t.context.config('SOME_ENV_VAR')
    .default('some default value')
    .exec()
  // Assert
  t.is(result, expected)
})

test('should throw if required and doesnt exist', t => {
  // Arrange
  // Assert
  t.throws(function () {
    // Act
    t.context.config('SOME_ENV_VAR')
      .required()
      .exec()
  })
})

test('should return value when required', t => {
  // Arrange
  process.env.SOME_ENV_VAR = 'abcd'
  const expected = 'abcd'
  // Act
  const result = t.context.config('SOME_ENV_VAR')
    .required()
    .exec()
  // Assert
  t.is(result, expected)
})

test('should return value when required', t => {
  // Arrange
  process.env.SOME_ENV_VAR = 'abcd'
  const expected = 'abcd'
  // Act
  const result = t.context.config('SOME_ENV_VAR')
    .required()
    .exec()
  // Assert
  t.is(result, expected)
})

test('should throw if value is not a number', t => {
  // Arrange
  process.env.SOME_ENV_VAR = 'abcd'
  // Assert
  t.throws(function () {
    // Act
    t.context.config('SOME_ENV_VAR')
      .int()
      .exec()
  })
})

test('should parse string as int', t => {
  // Arrange
  process.env.SOME_ENV_VAR = '2'
  const expected = 2
  // Act
  const result = t.context.config('SOME_ENV_VAR')
    .int()
    .exec()
  // Assert
  t.is(result, expected)
})

test('should convert string to array', t => {
  // Arrange
  process.env.SOME_ENV_VAR = 'a,b,c,d'
  const expected = ['a', 'b', 'c', 'd']
  // Act
  const result = t.context.config('SOME_ENV_VAR')
    .arr()
    .exec()
  // Assert
  t.deepEqual(result, expected)
})

test('should convert convert newline', t => {
  // Arrange
  process.env.SOME_ENV_VAR = 'sometext\\nstringstuffetc'
  const expected = 'sometext\nstringstuffetc'
  // Act
  const result = t.context.config('SOME_ENV_VAR')
    .fixNewline()
    .exec()
  // Assert
  t.deepEqual(result, expected)
})

test('should return string as is', t => {
  // Arrange
  process.env.SOME_ENV_VAR = 'sometextstringstuffetc'
  const expected = 'sometextstringstuffetc'
  // Act
  const result = t.context.config('SOME_ENV_VAR')
    .fixNewline()
    .exec()
  // Assert
  t.deepEqual(result, expected)
})
