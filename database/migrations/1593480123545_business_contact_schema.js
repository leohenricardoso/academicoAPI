'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BusinessContactSchema extends Schema {
  up () {
    this.create('business_contacts', (table) => {
      table.increments()
      table.string('name', 70).notNullable()
      table.string('cpf', 14).notNullable()
      table.string('crp', 25).notNullable()
      table.string('email', 200).notNullable()
      table.string('subject', 100).notNullable()
      table.string('message', 400).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('business_contacts')
  }
}

module.exports = BusinessContactSchema
