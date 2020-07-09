'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BusinessContact = use('App/Models/BusinessContact')

/**
 * Resourceful controller for interacting with businesscontacts
 */
class BusinessContactController {
  /**
   * Show a list of all businesscontacts.
   * GET businesscontacts
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index ({  response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    return await BusinessContact.all()
  }

  /**
   * Create/save a new businesscontact.
   * POST businesscontacts
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
      'cpf',
      'crp',
      'email',
      'subject',
      'message'
    ])

    const businesscontact = await BusinessContact.create({
      ...data
    })
  }

  /**
   * Display a single businesscontact.
   * GET businesscontacts/:id
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

    return await BusinessContact.findOrFail(params.id)
  }

  /**
   * Update businesscontact details.
   * PUT or PATCH businesscontacts/:id
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

    const businesscontact = await BusinessContact.findOrFail(params.id)
    const data = request.only([
      'name',
      'cpf',
      'crp',
      'email',
      'subject',
      'message'
    ])

    businesscontact.merge(data)
    await businesscontact.save()

    return businesscontact
  }

  /**
   * Delete a businesscontact with id.
   * DELETE businesscontacts/:id
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
    const businesscontact = await BusinessContact.findOrFail(params.id)
    await businesscontact.delete()
  }
}

module.exports = BusinessContactController
