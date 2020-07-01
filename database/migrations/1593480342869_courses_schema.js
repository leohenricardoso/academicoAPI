'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoursesSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.integer('category_id').unsigned().references('id').inTable('course_categories')
      table.integer('type_id').unsigned().references('id').inTable('course_types')
      table.integer('speaker_id').unsigned().references('id').inTable('course_speakers')
      table.string('name', 150).notNullable().unique()
      table.string('description', 300).notNullable()
      table.string('contents', 3000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CoursesSchema
