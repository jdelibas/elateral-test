'use strict'

// Test modules
const test = require('ava').test
const proxyquire = require('proxyquire')
const sinon = require('sinon')

test.beforeEach(t => {
  t.context.hapi = {
    connection: sinon.stub(),
    route: sinon.stub(),
    start: sinon.stub(),
    register: sinon.stub(),
    ext: sinon.stub(),
    on: sinon.stub()
  }
  t.context.hapiMock = {
    Server: sinon.stub().returns(t.context.hapi)
  }
  t.context.config = {
    port: 80
  }
  t.context.routes = [{
    path: 'test/path'
  }]
  t.context.connector = sinon.stub()

  t.context.index = proxyquire
        .noCallThru()
        .load('./../src/index', {
          'hapi': t.context.hapiMock,
          './config': t.context.config,
          './routes': t.context.routes,
          './connector': t.context.connector
        })
})

test('should call connector', t => {
  // Arrange
  // Act
  // Assert
  t.true(t.context.connector.calledOnce)
})

test('should setup hapi server on port', t => {
  // Arrange
  const expected = {
    port: t.context.config.port
  }
  // Act
  // Assert
  t.true(t.context.hapi.connection.calledWithExactly(expected))
})

test.skip('should setup routes', t => {
  // Arrange
  const expected = t.context.routes[0]
  // Act
  // Assert
  t.true(t.context.hapi.route.calledWithExactly(expected))
})

test('should throw error if server fails to start', t => {
  // Arrange
  // Assert
  t.throws(() => {
    // Act
    t.context.hapi.start.yield('err')
  })
})

test('should throw error if server fails to start', t => {
  // Arrange
  const log = sinon.spy(console, 'log')
  t.context.hapi.info = {
    uri: 'some uri'
  }
  const expected = 'Server running at some uri'
  // Act
  t.context.hapi.register.yield()
  t.context.hapi.start.yield(null)
  // Assert
  t.true(log.calledWithExactly(expected))
})
