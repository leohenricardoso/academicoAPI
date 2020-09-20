'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MercadopagoSchema extends Schema {
  up () {
    this.create('mercado_pagos', (table) => {
      table.increments()
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.string('transaction_id').notNullable()
      table.string('status', 50).notNullable()
      table.string('payment_method_id', 50)
      table.string('payment_type_id', 50).notNullable()
      table.string('boleto_url', 200)
      table.string('boleto_barcode', 200)
      table.string('date_of_expiration', 200)
      table.decimal('transaction_amount', 10, 2)
      table.decimal('net_received_amount', 10, 2)
      table.decimal('total_paid_amount', 10, 2)
      table.decimal('overpaid_amount', 10, 2)
      table.decimal('installment_amount', 10, 2)
      table.decimal('transaction_amount_refunded', 10, 2)
      table.decimal('total_fee_amount', 10, 2)
      table.boolean('captured')
      table.boolean('process_invite_link')
      table.string('payer_doc', 20)
      table.string('notification_url', 300)
      table.string('installments', 10)
      table.timestamp('date_created')
      table.timestamp('date_approved')
      table.timestamp('date_last_updated')
      table.string('data', 4000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('mercado_pagos')
  }
}

module.exports = MercadopagoSchema
