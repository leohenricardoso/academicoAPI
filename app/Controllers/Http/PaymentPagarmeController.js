'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PaymentPagarme = use('App/Models/PaymentPagarme')
/**
 * Resourceful controller for interacting with paymentpagarmes
 */
class PaymentPagarmeController {
  /**
   * Show a list of all paymentpagarmes.
   * GET paymentpagarmes
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index ({ response, auth }) {
  if(!auth.user.id) {
    return response.status(401)
  }

    return await PaymentPagarme.all()
  }

  /**
   * Create/save a new paymentpagarme.
   * POST paymentpagarmes
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

    const data = request.post()

    const paymentpagarme = await PaymentPagarme.create({
      ...data
    })
  }

  /**
   * Display a single paymentpagarme.
   * GET paymentpagarmes/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async show ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    return await PaymentPagarme.findOrFail(params.id)
  }

  /**
   * Update paymentpagarme details.
   * PUT or PATCH paymentpagarmes/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update ({ params, request, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const paymentpagarme = await PaymentPagarme.findOrFail(params.id)
    const data = request.post()
    paymentpagarme.merge(data)
    await paymentpagarme.save()
    return paymentpagarme
  }

  /**
   * Delete a paymentpagarme with id.
   * DELETE paymentpagarmes/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const paymentpagarme = await PaymentPagarme.findOrFail(params.id)
    await paymentpagarme.delete()
  }
}

module.exports = PaymentPagarmeController
