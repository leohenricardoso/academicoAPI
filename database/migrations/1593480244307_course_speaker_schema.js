'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseSpeakerSchema extends Schema {
  up () {
    this.create('course_speakers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('course_speakers')
  }
}

module.exports = CourseSpeakerSchema
