'use strict'

const _ = require('lodash')
const contactsSchema = require('./contacts.schema')

module.exports = {
  list,
  single,
  create,
  update,
  remove
}

function list (params) {
  return contactsSchema
    .find()
    .skip((params.page - 1) * params.limit)
    .sort({
      createdAt: -1
    })
    .select({
      __v: 0,
      _id: 0
    })
    .exec()
}

function single (uuid) {
  return contactsSchema.findOne({
    uuid
  })
  .select({
    __v: 0,
    _id: 0
  })
}

function create (contact) {
  if (!contact) {
    return Promise.reject(new Error('Missing contact'))
  }
  return contactsSchema.create(contact)
}

function update (uuid, contact) {
  if (!uuid) {
    return Promise.reject(new Error('Missing uuid'))
  }
  if (!contact) {
    return Promise.reject(new Error('Missing contact'))
  }
  return contactsSchema.findOneAndUpdate({
    uuid
  }, contact)
}

function remove (uuid) {
  if (!uuid) {
    return Promise.reject(new Error('Missing uuid'))
  }
  return contactsSchema.findOneAndRemove({
    uuid
  })
}
