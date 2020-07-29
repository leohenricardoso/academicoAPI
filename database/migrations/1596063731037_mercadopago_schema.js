'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MercadopagoSchema extends Schema {
  up () {
    this.create('mercadopagos', (table) => {
      table.increments()
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.string('transaction_id').notNullable()
      table.string('status', 50).notNullable()
      table.string('payment_method_id', 50).notNullable()
      table.string('boleto_url', 200)
      table.string('boleto_barcode', 200)
      table.string('date_of_expiration', 200)
      table.decimal('transaction_amount', 10, 2)
      table.decimal('transaction_amount_refunded', 10, 2)
      table.decimal('total_paid_amount', 10, 2)
      table.decimal('installment_amount', 10, 2)
      table.boolean('captured')
      table.string('payer_doc', 20)
      table.string('notification_url', 300)
      table.string('installments', 10)
      table.string('data', 2000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('mercadopagos')
  }
}

module.exports = MercadopagoSchema
