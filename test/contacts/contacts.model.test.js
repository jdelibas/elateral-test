'use strict'

const test = require('ava').test
const proxyquire = require('proxyquire')
const sinon = require('sinon')

test.beforeEach(t => {
  t.context.contactsSchema = {
    exec: sinon.stub(),
    select: sinon.stub(),
    sort: sinon.stub(),
    skip: sinon.stub(),
    find: sinon.stub(),
    findOne: sinon.stub(),
    create: sinon.stub(),
    findOneAndUpdate: sinon.stub(),
    findOneAndRemove: sinon.stub()
  }
  t.context.contactsSchema.findOneAndRemove.returns(t.context.contactsSchema)
  t.context.contactsSchema.findOneAndUpdate.returns(t.context.contactsSchema)
  t.context.contactsSchema.create.returns(t.context.contactsSchema)
  t.context.contactsSchema.findOne.returns(t.context.contactsSchema)
  t.context.contactsSchema.find.returns(t.context.contactsSchema)
  t.context.contactsSchema.skip.returns(t.context.contactsSchema)
  t.context.contactsSchema.sort.returns(t.context.contactsSchema)
  t.context.contactsSchema.select.returns(t.context.contactsSchema)
  t.context.contactsSchema.exec.returns(t.context.contactsSchema)

  t.context.model = proxyquire
        .noCallThru()
        .load('./../../src/contacts/contacts.model', {
          './contacts.schema': t.context.contactsSchema
        })
})

test('should find all when listing', t => {
  // Arrange
  const expected = undefined
  const params = {}
  // Act
  t.context.model.list(params)
  const result = t.context.contactsSchema.find.args[0][0]
  // Assert
  t.is(expected, result)
})

test('should not skip page 1 when listing', t => {
  // Arrange
  const expected = 0
  const params = {
    page: 1,
    limit: 1
  }
  // Act
  t.context.model.list(params)
  const result = t.context.contactsSchema.skip.args[0][0]
  // Assert
  t.is(expected, result)
})

test('should skip based on page and limit when listing', t => {
  // Arrange
  const expected = 1
  const params = {
    page: 2,
    limit: 1
  }
  // Act
  t.context.model.list(params)
  const result = t.context.contactsSchema.skip.args[0][0]
  // Assert
  t.is(expected, result)
})

test('should sort by createdAt when listing', t => {
  // Arrange
  const expected = {
    createdAt: -1
  }
  const params = {}
  // Act
  t.context.model.list(params)
  const result = t.context.contactsSchema.sort.args[0][0]
  // Assert
  t.deepEqual(expected, result)
})

test('should remove fields when listing', t => {
  // Arrange
  const expected = {
    __v: 0,
    _id: 0
  }
  const params = {}
  // Act
  t.context.model.list(params)
  const result = t.context.contactsSchema.select.args[0][0]
  // Assert
  t.deepEqual(expected, result)
})

test('should find one with uuid when single entry', t => {
  // Arrange
  const expected = {
    uuid: 1
  }
  const uuid = 1
  // Act
  t.context.model.single(uuid)
  const result = t.context.contactsSchema.findOne.args[0][0]
  // Assert
  t.deepEqual(expected, result)
})

test('should remove fields when single entry', t => {
  // Arrange
  const expected = {
    __v: 0,
    _id: 0
  }
  const params = {}
  // Act
  t.context.model.single(params)
  const result = t.context.contactsSchema.select.args[0][0]
  // Assert
  t.deepEqual(expected, result)
})

test('should reject without contact when creating', async t => {
  // Arrange
  const expected = 'Missing contact'
  // Act
  const error = await t.throws(t.context.model.create())
  // Assert
  t.is(expected, error.message)
})

test('should reject without contact when creating', t => {
  // Arrange
  const expected = {
    some: 'contact'
  }
  const contact = {
    some: 'contact'
  }
  // Act
  t.context.model.create(contact)
  const result = t.context.contactsSchema.create.args[0][0]
  // Assert
  t.deepEqual(expected, result)
})

test('should reject without uuid when updating', async t => {
  // Arrange
  const expected = 'Missing uuid'
  // Act
  const error = await t.throws(t.context.model.update())
  // Assert
  t.is(expected, error.message)
})

test('should reject without contact when updating', async t => {
  // Arrange
  const expected = 'Missing contact'
  // Act
  const error = await t.throws(t.context.model.update(1))
  // Assert
  t.is(expected, error.message)
})

test('should find one via uuid when updating', t => {
  // Arrange
  const expected = {
    uuid: 1
  }
  const uuid = 1
  const contact = {
    some: 'contact'
  }
  // Act
  t.context.model.update(uuid, contact)
  const result = t.context.contactsSchema.findOneAndUpdate.args[0][0]
  // Assert
  t.deepEqual(expected, result)
})

test('should update via contact when updating', t => {
  // Arrange
  const expected = {
    some: 'contact'
  }
  const uuid = 1
  const contact = {
    some: 'contact'
  }
  // Act
  t.context.model.update(uuid, contact)
  const result = t.context.contactsSchema.findOneAndUpdate.args[0][1]
  // Assert
  t.deepEqual(expected, result)
})

test('should reject without uuid when removing', async t => {
  // Arrange
  const expected = 'Missing uuid'
  // Act
  const error = await t.throws(t.context.model.remove())
  // Assert
  t.is(expected, error.message)
})

test('should update via contact when updating', t => {
  // Arrange
  const expected = {
    uuid: 1
  }
  const uuid = 1
  // Act
  t.context.model.remove(uuid)
  const result = t.context.contactsSchema.findOneAndRemove.args[0][0]
  // Assert
  t.deepEqual(expected, result)
})
