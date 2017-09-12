'use strict'

const mongoose = require('mongoose')
const uuid = require('uuid')

const schemaOptions = {
  timestamps: true
}

const contactsSchema = new mongoose.Schema({
  uuid: {
    unique: true,
    type: String,
    default: uuid.v4,
    trim: true
  },
  profile: {
    name: String,
    surname: String,
    company: String
  },
  number: String
}, schemaOptions)

module.exports = mongoose.model('Contacts', contactsSchema)
