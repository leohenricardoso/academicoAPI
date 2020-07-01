'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentPagarmeSchema extends Schema {
  up () {
    this.create('payment_pagarmes', (table) => {
      table.increments()
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.string('transaction_id').notNullable()
      table.string('status', 50).notNullable()
      table.string('payment_method', 50).notNullable()
      table.string('card_number', 40)
      table.string('card_owner', 150)
      table.string('card_exp_date', 5)
      table.string('card_cvv', 10)
      table.string('boleto_url', 200)
      table.string('boleto_barcode', 200)
      table.string('boleto_exp_date', 200)
      table.decimal('paid_amount', 10, 2)
      table.decimal('authorized_amount', 10, 2)
      table.json('data').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('payment_pagarmes')
  }
}

module.exports = PaymentPagarmeSchema
