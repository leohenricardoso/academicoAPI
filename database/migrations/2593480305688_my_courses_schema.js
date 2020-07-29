'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MyCoursesSchema extends Schema {
  up () {
    this.create('my_courses', (table) => {
      table.increments()
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.integer('payment_id').unsigned().references('id').inTable('mercadopagos')
      table.boolean('active').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('my_courses')
  }
}

module.exports = MyCoursesSchema
