'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseCategorySchema extends Schema {
  up () {
    this.create('course_categories', (table) => {
      table.increments()
      table.string('category', 40).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('course_categories')
  }
}

module.exports = CourseCategorySchema
