'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Contact = use('App/Models/Contact')
const Database = use('Database')

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {
  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index ({ response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }
    return await Contact.all()
  }

  /**
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store ({ request, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    const data = request.only([
      'name',
      'email',
      'subject',
      'message'
    ])

    const contact = await Contact.create({
      ...data
    })
  }

    /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async getContacts ({ params, response, auth }) {

    if (!auth.user.id) {
      return response.status(401)
    }
    let contacts = await Database
    .from('contacts')
    .orderBy('created_at', 'asc')
    .paginate(params.pages, params.limit)

    return await contacts
  }

  /**
   * Display a single contact.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async show ({ params, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    return await Contact.findOrFail(params.id)

  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update ({ params, request, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    const contact = await Contact.findOrFail(params.id)
    const data = request.only([
      'name',
      'email',
      'subject',
      'message'
    ])

    contact.merge(data)
    await contact.save()

    return contact
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy ({ params, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }
    const contact = await Contact.findOrFail(params.id)
    await contact.delete()
  }
}

module.exports = ContactController
