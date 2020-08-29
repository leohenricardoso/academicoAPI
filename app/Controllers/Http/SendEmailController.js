'use strict'

const Mail = use('Mail')
const Logger = use('Logger')
const QRCode = use('qrcode')
const Helpers = use('Helpers')
const Drive = use('Drive')
const Env = use('Env')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Course = use('App/Models/Course')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Student = use('App/Models/Student')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const MercadoPagoModel = use('App/Models/MercadoPago')

class SendEmailController {

  async sendCourseLinkEmailByAdmin({
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    try {
      var data = {}
      const req = request.post()

      // Busca dados do curso pelo id
      var course = await Course.findOrFail(req.course_id)

      // Busca estudante pelo email
      var student = await Student.findOrFail(req.student_id)

      if (course == undefined || student == undefined) {
        return
      }

      data.course = course
      data.student = student
      data.link = req.link

      if (data.link == undefined || data.link == null) {
        return
      }

      await Mail.send('emails.sendCourseLinkManual', {
        data: data
      }, (message) => {
        message
          // .to(data.student.email)
          .to('leohenricardoso@gmail.com')
          .from(Env.get('EMAIL_SMTP'))
          .subject('Acadêmico - Acesso ao curso')
      })

      const payment = await MercadoPagoModel.findOrFail(req.payment_id)
      data = {
        process_invite_link: true
      }
      payment.merge(data)
      await payment.save()

      return payment
    } catch (error) {
      Logger.error(error)
      return error
    }
  }

  async sendContactEmail({
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    try {
      const data = request.post()

      await Mail.send('emails.contact', {
        data: data
      }, (message) => {
        message
          .to(data.email)
          .from(Env.get('EMAIL_SMTP'))
          .subject(data.subject)
      })
    } catch (error) {
      Logger.error(error)
      return error
    }
  }

  async sendShopEmail({
    request,
    params,
    response
  }) {
    try {
      let data = request.post()
      const course = await Course.findOrFail(params.courseId)
      const student = await Student.findByOrFail('email', data.email)

      if (course == undefined || student == undefined) {
        return response.status(404)
      }

      data.course = course
      data.student = student

      await Mail.send('emails.courseBuy', {
        data: data
      }, (message) => {
        message
          .to(data.email)
          .from(Env.get('EMAIL_SMTP'))
          .subject('Acadêmico Cursos - ' + course.name)
      })

      return data
    } catch (error) {
      Logger.error(error)
      return error
    }
  }

  async sendInviteToPresentialCourse({
    params,
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    try {
      const student = await Student.findOrFail(params.studentId)
      const course = await Course.findOrFail(params.courseId)
      let data = request.post()
      data.course = course
      data.student = student

      let fileName = `${student.full_name}-${student.cpf}-${course.name}-${Date.now().toString()}.png`

      QRCode.toFile(`tmp/qrcode/${fileName}`,
        `Nome: ${student.full_name} - CPF: ${student.cpf} - Curso: ${course.name}`, {
          color: {
            dark: '#000',
            light: '#fff'
          }
        },
        function (err) {
          if (err) {
            throw err
          }
        })

      await Mail.send('emails.invitePresential', {
        data: data
      }, (message) => {
        message
          .to(student.email)
          .from(Env.get('EMAIL_SMTP'))
          .subject('Acadêmico Cursos - ' + course.name)
        //.attach(Helpers.tmpPath(`qrcode/${fileName}`))
      })

      //await Drive.delete(`qrcode/${fileName}`)

      return data
    } catch (error) {
      Logger.info(error)
      return error
    }
  }
}

module.exports = SendEmailController
