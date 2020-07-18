'use strict'

const Mail = use('Mail')
const Logger = use('Logger')
const QRCode = use('qrcode')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Course = use('App/Models/Course')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Student = use('App/Models/Student')

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
      Logger.error(error)
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
      Logger.error(error)
      return error
    }
  }

  async sendInviteToPresentialCourse({
    params
  }) {
    try {
      Logger.level = 'debug'
      const student = await Student.findOrFail(params.studentId)
      const course = await Course.findOrFail(params.courseId)

      Logger.debug(student)

      QRCode.toDataURL('tmp/qrcode/qrCourse.png',
        `Nome: ${student.full_name} - CPF: ${student.cpf}`,
        {
          color: {
            dark: '#000',
            light: '#fff'
          }
        }, function (err) {
          Logger.error(err)
        })

      await Mail.send('emails.inviteCourse', {
        data: data
      }, (message) => {
        message
          .to(student.email)
          .from('leohenricardoso@gmail.com')
          .subject('Acadêmico Cursos - ' + course.name)
          .attach(Helpers.tmpPath('qrcode/qrCourse.png'))
      })

    } catch (error) {
      Logger.error(error)
      return error
    }
  }
}

module.exports = SendEmailController
