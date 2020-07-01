'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokenAdminSchema extends Schema {
  up () {
    this.create('token_admins', (table) => {
      table.increments()
      table.integer('admin_id').unsigned().references('id').inTable('user_admins')
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('token_admins')
  }
}

module.exports = TokenAdminSchema
