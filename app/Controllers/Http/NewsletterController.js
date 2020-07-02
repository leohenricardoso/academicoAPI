'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Newsletter = use('App/Models/Newsletter')
const Database = use('Database')

/**
 * Resourceful controller for interacting with newsletters
 */
class NewsletterController {
  /**
   * Show a list of all newsletters.
   * GET newsletters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({  response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }
    return await Newsletter.all()
  }

  /**
   * Create/save a new newsletter.
   * POST newsletters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    const data = request.only([
      'email',
      'active'
    ])

    const newsletter = await Newsletter.create({
      ...data
    })
  }

  /**
   * Display a single newsletter.
   * GET newsletters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    return await Newsletter.findOrFail(params.id)

  }

  /**
   * Update newsletter details.
   * PUT or PATCH newsletters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    const newsletter = await Newsletter.findOrFail(params.id)
    const data = request.only([
      'email',
      'active'
    ])

    newsletter.merge(data)
    await newsletter.save()

    return newsletter
  }

  /**
   * Delete a newsletter with id.
   * DELETE newsletters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }
    const newsletter = await Newsletter.findOrFail(params.id)
    await newsletter.delete()
  }
}

module.exports = NewsletterController
