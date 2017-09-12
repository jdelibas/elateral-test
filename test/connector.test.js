'use strict'

const test = require('ava').test
const proxyquire = require('proxyquire')
const sinon = require('sinon')

test.beforeEach(t => {
  t.context.mongoose = {
    connect: sinon.stub()
  }
  t.context.config = {
    mongodb: {
      uri: 'some uri'
    }
  }

  t.context.connector = proxyquire
        .noCallThru()
        .load('./../src/connector', {
          'mongoose': t.context.mongoose,
          './config': t.context.config
        })
})

test('should throw if error', t => {
  // Arrange
  // Assert
  t.throws(() => {
    // Act
    t.context.connector()
    t.context.mongoose.connect.yield('err')
  })
})

test('should log on connect', t => {
  // Arrange
  let log = sinon.stub(console, 'log')
  // Act
  t.context.connector()
  t.context.mongoose.connect.yield(null)
  // Assert
  t.true(log.called)
})
