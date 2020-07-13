'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAdminTokenSchema extends Schema {
  up () {
    this.create('user_admin_tokens', (table) => {
      table.increments()
      table.integer('user_admin_id').unsigned().references('id').inTable('user_admins')
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_admin_tokens')
  }
}

module.exports = UserAdminTokenSchema
