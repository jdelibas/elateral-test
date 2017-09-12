'use strict'

const contactsModel = require('./contacts.model')

module.exports = {
  list,
  single,
  create,
  update,
  remove
}

async function list (request, reply) {
  const params = {
    page: request.query.page,
    limit: request.query.limit
  }
  try {
    const contacts = await contactsModel.list({
      page: params.page,
      limit: params.limit
    })
    if (contacts.length === 0) {
      return reply({
        message: 'No contacts were found'
      })
    }
    return reply(contacts)
  } catch (error) {
    return reply(error).code(500)
  }
}

async function single (request, reply) {
  const params = {
    uuid: request.params.uuid
  }
  try {
    const contact = await contactsModel.single(params.uuid)
    return reply(contact)
  } catch (error) {
    return reply(error).code(500)
  }
}

async function create (request, reply) {
  const params = {
    number: request.payload.number,
    profile: request.payload.profile
  }
  try {
    const contact = await contactsModel.create({
      number: params.number,
      profile: params.profile
    })
    return reply({
      message: `Sucessfully created contact: ${contact.uuid}`
    })
  } catch (error) {
    return reply(error).code(500)
  }
}

async function update (request, reply) {
  const params = {
    number: request.payload.number,
    profile: request.payload.profile,
    uuid: request.params.uuid
  }
  try {
    await contactsModel.update(params.uuid, {
      number: params.number,
      profile: params.profile
    })
    return reply({
      message: `Sucessfully updated contact: ${params.uuid}`
    })
  } catch (error) {
    return reply(error).code(500)
  }
}

async function remove (request, reply) {
  const params = {
    uuid: request.params.uuid
  }
  try {
    await contactsModel.remove(params.uuid)
    return reply({
      message: `Sucessfully removed contact: ${params.uuid}`
    })
  } catch (error) {
    return reply(error).code(500)
  }
}
