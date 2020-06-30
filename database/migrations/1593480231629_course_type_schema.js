'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseTypeSchema extends Schema {
  up () {
    this.create('course_types', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('course_types')
  }
}

module.exports = CourseTypeSchema
