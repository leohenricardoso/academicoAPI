'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentPagarmeSchema extends Schema {
  up () {
    this.create('payment_pagarmes', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('payment_pagarmes')
  }
}

module.exports = PaymentPagarmeSchema
