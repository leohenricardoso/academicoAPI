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

  /*async createPayment({
    request,
    response,
    auth
  }) {
    const req = request.all()
    Logger.info(req.data)

    const payment_data = {
      transaction_amount: parseFloat(req.data.amount),
      token: req.data.token,
      description: req.data.course,
      installments: req.data.installment,
      payment_method_id: req.data.payment_method_id,
      payer: {
        email: req.data.email
      }
    }


    MP.configurations.setAccessToken(Env.get('ACCESS_KEY_MP'))
    MP.payment.save(
      payment_data
    ).then(function (res) {
      Logger.info(res);
      response.send(res);
    }).catch(function (error) {
      Logger.info(error);
    });
  }*/

  async checkoutPro({
    params,
    response,
    request
  }) {
    MP.configure({
      access_token: Env.get('ACCESS_KEY_MP')
    });
    const req = request.post()
    let preference = {
      items: [
        {
          title: req.course,
          unit_price: req.amount,
          quantity: 1,
        }
      ]
    };
    var teste = {
      teste2: 'blabla'
    }
    var data = {}
    await MP.preferences.create(preference)
      .then(function(res){
      // Este valor substituirá a string "<%= global.id %>" no seu HTML
      data.result = res.body
      Logger.info(data.result);
      Logger.info(teste);
      return teste
      Logger.info('NÂO RETORNOU AQUI');
      }).catch(function(error){
        Logger.info('EROUUUU');
      });
      Logger.info('NÂO VAI SER AGHORA');
      return data
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

    return await MercadoPagoModel.all()
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
}

module.exports = MercadoPagoController
