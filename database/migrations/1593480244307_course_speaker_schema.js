'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseSpeakerSchema extends Schema {
  up () {
    this.create('course_speakers', (table) => {
      table.increments()
      table.string('name', 120).notNullable().unique()
      table.string('email', 200).notNullable().unique()
      table.string('image').notNullable()
      table.string('description', 200).notNullable()
      table.string('instagram', 70)
      table.string('facebook', 150)
      table.string('linkedin', 150)
      table.timestamps()
    })
  }

  down () {
    this.drop('course_speakers')
  }
}

module.exports = CourseSpeakerSchema
