'use strict'

const test = require('ava').test
const proxyquire = require('proxyquire')

test.beforeEach(t => {
  t.context.contacts = ['contacts']

  t.context.routes = proxyquire
        .noCallThru()
        .load('./../src/routes', {
          './contacts/contacts.routes': t.context.contacts
        })
})

test('should spread contacts routes', t => {
  // Arrange
  const expected = 'contacts'
  // Act
  const result = t.context.routes[0]
  // Assert
  t.is(expected, result)
})
