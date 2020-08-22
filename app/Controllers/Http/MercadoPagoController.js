'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MercadoPagoModel = use('App/Models/MercadoPago')
const Logger = use('Logger')
const MERCADOPAGO = use('mercadopago')
const Env = use('Env')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Course = use('App/Models/Course')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
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

    // Busca dados do curso pelo id
    const course = await Course.findOrFail(req.data.course)

    // Prepara dados do curso para enviar ao MERCADOPAGO
    let courseId = course.id
    courseId = courseId.toString()
    let courseCategoryLabel = course.category_label ? course.category_label : course.name
    courseCategoryLabel = courseCategoryLabel.toString()

    // Cria objeto de pagamento para ser enviado ao MERCADOPAGO
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
      metadata: {
        student_email: req.data.email
      },
      additional_info: {
        payer: {
          first_name: req.data.name
        },
        items: [{
          id: courseId,
          title: course.name,
          description: course.description,
          picture_url: `${Env.get('URL_COURSE_IMG')}${course.image_path}`,
          category_id: courseCategoryLabel,
          quantity: 1,
          unit_price: req.data.amount
        }]
      }
    }

    // Set access token do MERCADOPAGO
    MERCADOPAGO.configurations.setAccessToken(Env.get('ACCESS_KEY_MP'))

    // Envia dados ao MERCADOPAGO para realizar pagamento
    var paymentReturn = null
    await MERCADOPAGO.payment.save(
      payment_data
    ).then(function (res) {
      paymentReturn = res.response
    }).catch(function (error) {
      Logger.info(error);
    });

    if (!paymentReturn) {
      return null
    }

    return paymentReturn
  }

  /**
   * Show a list of all mercadopagos.
   * GET mercadopagos
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async postbackMP({
    params,
    response,
    request
  }) {
    try {
      const req = request.all()

      // Set access token do MERCADOPAGO
      MERCADOPAGO.configure({
        access_token: Env.get('ACCESS_KEY_MP')
      })

      const paymentPostback = await MERCADOPAGO.payment.get(req.data.id)
      Logger.info('POSTBACK')
      Logger.info(paymentPostback.response)

      const payment = await MercadoPagoModel.findBy('transaction_id', req.data.id)

      if (payment) {
        // Caso o status do pagamento for diferente do salvo no banco, irá atualizar as
        // informações no banco de dados
        if (payment.status != paymentPostback.response.status) {
          // Pega dados a ser mergeados
          let newPaymentStatus = {
            status: paymentPostback.response.status,
            date_approved: paymentPostback.response.date_approved,
            date_last_updated: paymentPostback.response.date_last_updated,
            data: paymentPostback.response
          }
          // Mergeia e salva os dados no banco de dados
          payment.merge(newPaymentStatus)
          await payment.save()
        }
      } else {
        // Busca dados do curso pelo id
        const course = await Course.findOrFail(Number(paymentPostback.response.additional_info.items[0].id))

        // Verifica se tem estudante cadastrado com determinado email, se não tiver, cadastra um.
        let student = await Student.findBy('email', paymentPostback.response.metadata.student_email)
        if (!student) {
          student = await Student.create({
            full_name: req.data.name,
            email: req.data.email,
            cpf: req.data.identification_number
          })
        }

        // Salva dados de pagamento no banco de dados
        const jsonData = JSON.stringify(paymentPostback.response)
        const mercadopago_model = await MercadoPagoModel.create({
          course_id: course.id,
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
      }

      return response.status(200)

    } catch (error) {
      Logger.error(error)
    }
  }

  /**
   * Show a list of all mercadopagos.
   * GET mercadopagos
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async updatePaymentStatus({
    params,
    response,
    request
  }) {
    const req = request.post()

    const payment_id = req.payment_id
    const new_status = req.status

    MERCADOPAGO.configure({
      access_token: Env.get('ACCESS_KEY_MP')
    })

    const payment = await MERCADOPAGO.payment.update({
      id: payment_id,
      status: new_status
    })

    return payment
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

  async checkoutPro({
    params,
    response,
    request
  }) {
    MERCADOPAGO.configure({
      access_token: Env.get('ACCESS_KEY_MP')
    });
    const req = request.post()
    let preference = {
      items: [{
        title: req.course,
        unit_price: req.amount,
        quantity: 1,
      }]
    };
    var teste = {
      teste2: 'blabla'
    }
    var data = {}
    await MERCADOPAGO.preferences.create(preference)
      .then(function (res) {
        data.result = res.body
      }).catch(function (error) {
        data.result = false
      });

    return data
  }
}

module.exports = MercadoPagoController
