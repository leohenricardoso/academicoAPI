'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAdminSchema extends Schema {
  up () {
    this.create('user_admins', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_admins')
  }
}

module.exports = UserAdminSchema
