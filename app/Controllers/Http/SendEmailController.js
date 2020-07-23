'use strict'

const Mail = use('Mail')
const Logger = use('Logger')
const QRCode = use('qrcode')
const Helpers = use('Helpers')
const Drive = use('Drive')

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
          .from(data.from)
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
    request
  }) {
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
          .from(data.from)
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
