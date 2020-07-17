'use strict'

const Mail = use('Mail')
const Logger = use('Logger')
const QRCode = use('qrcode')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Course = use('Course')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Student = use('Student')

class SendEmailController {

  async sendContactEmail({
    request
  }) {
    try {
      const data = request.post()

      await Mail.send('emails.contact', {
        data: data
      }, (message) => {
        message
          .to(data.email)
          .from(data.from)
          .subject(data.subject)
      })
    } catch (error) {
      Logger.debug(error)
      return error
    }
  }

  async sendShopEmail({
    request,
    params
  }) {
    try {
      let data = request.post()
      const course = Course.findOrFail(params.courseId)
      data.course = course

      await Mail.send('emails.courseBuy', {
        data: data
      }, (message) => {
        message
          .to(data.email)
          .from(data.from)
          .subject('Acadêmico Cursos - ' + course.name)
      })
    } catch (error) {
      Logger.debug(error)
      return error
    }
  }

  async sendInviteToPresentialCourse({
    request,
    params
  }) {
    try {
      Logger.level = 'debug'
      const student = Student.findOrFail(params.studentId)
      const course = Course.findOrFail(params.courseId)

      QRCode.toDataURL(`Nome: ${student.full_name} - CPF: ${student.cpf}`, function (err, url) {
        Logger.debug(url)
      })

      QRCode.toString('I am a pony!', {
        type: 'terminal'
      }, function (err, url) {
        Logger.debug(url)
      })

      data.course = course

      await Mail.send('emails.courseBuy', {
        data: data
      }, (message) => {
        message
          .to(data.email)
          .from(data.from)
          .subject('Acadêmico Cursos - ' + course.name)
      })
    } catch (error) {
      Logger.debug(error)
      return error
    }
  }
}

module.exports = SendEmailController
