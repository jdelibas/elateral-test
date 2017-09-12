'use strict'

const config = require('./config')
const mongoose = require('mongoose')

module.exports = connector

function connector () {
  mongoose.Promise = Promise
  return mongoose.connect(config.mongodb.uri, err => {
    if (err) {
      throw new Error(err)
    }
    console.log(`Connected to ${config.mongodb.uri}`)
  })
}
