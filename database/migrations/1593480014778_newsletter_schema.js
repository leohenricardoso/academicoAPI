'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewsletterSchema extends Schema {
  up () {
    this.create('newsletters', (table) => {
      table.increments()
      table.string('email', 200).notNullable().unique()
      table.boolean('active').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('newsletters')
  }
}

module.exports = NewsletterSchema
