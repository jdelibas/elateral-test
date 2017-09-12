'use strict'

const env = require('./config.service')

const config = {
  env: env('NODE_ENV').default('production').exec(),
  port: env('PORT').default(8080).int().exec(),
  mongodb: {
    uri: env('MONGOURI').required().exec()
  }
}

module.exports = config
