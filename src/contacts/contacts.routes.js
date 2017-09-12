'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const contactsController = require('./contacts.controller')

let validation = {
  email: Joi.string().email().required().description('email'),
  page: Joi.number().default(1).min(1).max(999).description('Page number'),
  limit: Joi.number().default(50).min(1).max(50).description('Results limit'),
  name: Joi.string().min(2).max(64).description('Contacts name'),
  surname: Joi.string().min(2).max(64).description('Contacts surname'),
  company: Joi.string().min(2).max(64).description('Contacts company'),
  number: Joi.number().description('Contacts number'),
  uuid: Joi.string().guid({
    version: ['uuidv4']
  }).description('Unique uuid v4')
}
validation.profile = Joi.object().keys({
  name: validation.name,
  surname: validation.surname,
  company: validation.company
}).required().description('Contact Profile')

module.exports = [{
  method: 'GET',
  path: '/contacts',
  handler: contactsController.list,
  config: {
    description: `List all contacts`,
    notes: `
      Lists all contacts
      ### Pagination

      ### Scroll
    `,
    tags: ['api', 'public'],
    validate: {
      query: {
        page: validation.page,
        limit: validation.limit
      }
    }
  }
}, {
  method: 'GET',
  path: '/contacts/{uuid}',
  handler: contactsController.single,
  config: {
    description: `Get a single contact entry`,
    notes: `
      Lists all contacts
      ### Pagination

      ### Scroll
    `,
    tags: ['api', 'public'],
    validate: {
      params: {
        uuid: validation.uuid
      }
    }
  }
}, {
  method: 'POST',
  path: '/contacts',
  handler: contactsController.create,
  config: {
    description: `Create contact`,
    notes: `
      ###
    `,
    tags: ['api', 'public'],
    validate: {
      payload: {
        number: validation.number,
        profile: validation.profile
      }
    }
  }
}, {
  method: 'PUT',
  path: '/contacts/{uuid}',
  handler: contactsController.update,
  config: {
    description: `Update contact`,
    notes: `
      ###
    `,
    tags: ['api', 'public'],
    validate: {
      params: {
        uuid: validation.uuid
      },
      payload: {
        number: validation.number,
        profile: validation.profile
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/contacts/{uuid}',
  handler: contactsController.remove,
  config: {
    description: `Delete contact`,
    notes: `
      ###
    `,
    tags: ['api', 'public'],
    validate: {
      params: {
        uuid: validation.uuid
      }
    }
  }
}]
