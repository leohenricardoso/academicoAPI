'use strict'

const Mail = use('Mail')

class SendEmailController {

  async sendContactEmail({
    request
  }) {
    const data = request.post()

    await Mail.send('emails.contact', { data: data }, (message) => {
      message
        .to(data.email)
        .from(data.from)
        .subject(data.subject)
    })
  }
}

module.exports = SendEmailController
