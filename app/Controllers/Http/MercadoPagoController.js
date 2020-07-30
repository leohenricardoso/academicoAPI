'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MercadoPagoModel = use('App/Models/MercadoPago')
const Logger = use('Logger')
const MP = use('mercadopago')
const Env = use('Env')


/**
 * Resourceful controller for interacting with mercadopagos
 */
class MercadoPagoController {

  async createPayment({
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const data = request.only([
      'amount',
      'identification_number',
      'identification_type',
      'name',
      'course',
      'email',
      'installment',
      'payment_method_id',
      'public_key',
      'status',
      'token',
    ])

    const payment_data = {
      transaction_amount: data['amount'],
      token: data['token'],
      description: data['course'],
      installments: data['installment'],
      payment_method_id: data['payment_method_id'],
      payer: {
        email: data['email']
      }
    };

    Logger.info(data['token'])

    MP.configurations.setAccessToken(Env.get('ACCESS_KEY_MP'))
    MP.payment.save(payment_data).then(function (data) {
      response.send(data);
    }).catch(function (error) {
      Logger.info(error);
    });
  }

  /**
   * Show a list of all mercadopagos.
   * GET mercadopagos
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index({
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    this.teste()
    return await MercadoPagoModel.all()
  }

  /**
   * Create/save a new paymentmercadopago.
   * POST mercadopagos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store({
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const data = request.post()

    const paymentmercadopago = await MercadoPagoModel.create({
      ...data
    })
  }

  /**
   * Display a single paymentmercadopago.
   * GET mercadopagos/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async show({
    params,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    return await MercadoPagoModel.findOrFail(params.id)
  }

  /**
   * Update paymentmercadopago details.
   * PUT or PATCH mercadopagos/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update({
    params,
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const paymentmercadopago = await MercadoPagoModel.findOrFail(params.id)
    const data = request.post()
    paymentmercadopago.merge(data)
    await paymentmercadopago.save()
    return paymentmercadopago
  }

  /**
   * Delete a paymentmercadopago with id.
   * DELETE mercadopagos/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy({
    params,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const paymentmercadopago = await MercadoPagoModel.findOrFail(params.id)
    await paymentmercadopago.delete()
  }

  teste() {
    Logger.info('Teste')
  }
}

module.exports = MercadoPagoController
