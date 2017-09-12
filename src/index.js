'use strict'

const _ = require('lodash')
const Hapi = require('hapi')
const pkg = require('./../package.json')

const config = require('./config')
const routes = require('./routes')

// Connect to DB
require('./connector')()

const server = new Hapi.Server({
  debug: {
    request: ['error', 'uncaught']
  },
  connections: {
    routes: {
      cors: true
    }
  }
})

server.connection({
  port: config.port
})

server.ext('onPreResponse', (request, reply) => {
  if (_.hasIn(request, 'response.header')) {
    request.response.header('x-service-host', server.info.host)
    request.response.header('x-service-name', pkg.name)
    request.response.header('x-service-version', pkg.version)
  }
  return reply.continue()
})

server.on('response', (request) => {
  console.log(`${request.info.remoteAddress}:${request.method.toUpperCase()} ${request.url.path} --> ${request.response.statusCode}`)
})

server.register([
  require('inert'),
  require('vision'),
  {
    register: require('hapi-swagger'),
    options: {
      info: {
        title: pkg.name,
        version: pkg.version
      },
      jsonPath: '/_swagger.json'
    }
  }], err => {
  if (err) {
    throw err
  }

  routes.forEach(route => {
    server.route(route)
  })

  server.start(err => {
    if (err) {
      throw err
    }
    console.log(`Server running at ${server.info.uri}`)
  })
})
