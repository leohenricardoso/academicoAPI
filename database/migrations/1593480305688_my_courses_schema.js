'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MyCoursesSchema extends Schema {
  up () {
    this.create('my_courses', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('my_courses')
  }
}

module.exports = MyCoursesSchema
