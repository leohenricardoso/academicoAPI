'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BusinessContactSchema extends Schema {
  up () {
    this.create('business_contacts', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('business_contacts')
  }
}

module.exports = BusinessContactSchema
