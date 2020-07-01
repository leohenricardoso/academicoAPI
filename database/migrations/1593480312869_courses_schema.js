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
      table.string('image_path', 600).notNullable()
      table.json('contents').notNullable()
      table.json('info').notNullable()
      table.timestamps()
      table.decimal('base_amount', 10, 2)
      table.decimal('discount_amount', 10, 2)
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CoursesSchema
