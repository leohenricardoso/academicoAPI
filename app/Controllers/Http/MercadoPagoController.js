'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MercadoPagoModel = use('App/Models/MercadoPago')
const Logger = use('Logger')
const MP = use('mercadopago')
const Env = use('Env')
const Course = use('App/Models/Course')
const Student = use('App/Models/Student')


/**
 * Resourceful controller for interacting with mercadopagos
 */
class MercadoPagoController {

  async createPayment({
    request,
    response,
    auth
  }) {
    const req = request.all()

    // Verifica se tem estudante cadastrado com determinado email, se não tiver, cadastra um.
    let student = await Student.findBy('email', req.data.email)
    if (!student) {
      student = await Student.create({
        full_name: req.data.name,
        email: req.data.email,
        cpf: req.data.identification_number
      })
    }

    // Busca dados do curso pelo id
    const course = await Course.findOrFail(req.data.course)

    // Prepara dados do curso para enviar ao MP
    let courseId = course.id
    courseId = courseId.toString()
    let courseCategoryLabel = course.category_label ? course.category_label : course.name
    courseCategoryLabel = courseCategoryLabel.toString()

    // Cria objeto de pagamento para ser enviado ao MP
    const payment_data = {
      transaction_amount: req.data.amount,
      token: req.data.token,
      description: `${req.data.email} - ${course.name}`,
      installments: req.data.installment,
      payment_method_id: req.data.payment_method_id,
      payer: {
        email: req.data.email,
        identification: {
          type: req.data.identification_type,
          number: req.data.identification_number
        }
      },
      notification_url: Env.get('MERCADOPAGO_URL_NOTIFICATION'),
      additional_info: {
        payer: {
          first_name: req.data.name
        },
        items:[
          {
            id: courseId,
            title: course.name,
            description: course.description,
            picture_url: `${Env.get('URL_COURSE_IMG')}${course.image_path}`,
            category_id: courseCategoryLabel,
            quantity: 1,
            unit_price: req.data.amount
          }
        ]
      }
    }

    // Set access token do MP
    MP.configurations.setAccessToken(Env.get('ACCESS_KEY_MP'))

    // Envia dados ao MP para realizar pagamento
    var paymentReturn = null
    await MP.payment.save(
      payment_data
    ).then(function (res) {
      paymentReturn = res.response
    }).catch(function (error) {
      Logger.info(error);
    });

    if (!paymentReturn) {
      return null
    }

    // Salva dados de pagamento no banco de dados
    const jsonData = JSON.stringify(paymentReturn)
    const mercadopago_model = await MercadoPagoModel.create({
      course_id: courseId,
      student_id: student.id,
      transaction_id: paymentReturn.id,
      status: paymentReturn.status,
      payment_method_id: paymentReturn.payment_method_id,
      payment_type_id: paymentReturn.payment_type_id,
      transaction_amount: paymentReturn.transaction_amount,
      net_received_amount: paymentReturn.net_received_amount,
      total_paid_amount: paymentReturn.total_paid_amount,
      overpaid_amount: paymentReturn.overpaid_amount,
      installment_amount: paymentReturn.installment_amount,
      transaction_amount_refunded: paymentReturn.transaction_amount_refunded,
      total_fee_amount: paymentReturn.total_fee_amount,
      captured: paymentReturn.captured,
      payer_doc: paymentReturn.payer_doc,
      notification_url: paymentReturn.notification_url,
      installments: paymentReturn.installments,
      date_created: paymentReturn.date_created,
      date_approved: paymentReturn.date_approved,
      date_last_updated: paymentReturn.date_last_updated,
      data: jsonData
    })

    return mercadopago_model
  }

  async postbackMP({
    params,
    response,
    request
  }) {
    const req = request.all()
    Logger.info('RETORNO DO POSTBACK: --------------------')
    Logger.info(req)
    Logger.info(req.data.id)
    var payment = MP.get(`/v1/payments/${req.data.id}`)
    Logger.info(payment)
  }

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
        data.result = res.body
      }).catch(function(error){
        data.result = false
      });

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
