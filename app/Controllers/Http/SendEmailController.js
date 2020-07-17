'use strict'

const Mail = use('Mail')
const Logger = use('Logger')

class SendEmailController {

  async sendContactEmail({
    request
  }) {
    try {
      Logger.level = 'debug'
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
}

module.exports = SendEmailController
