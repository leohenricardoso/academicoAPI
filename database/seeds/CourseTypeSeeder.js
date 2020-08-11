'use strict'

/*
|--------------------------------------------------------------------------
| CourseTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CourseTypeSeeder {
  static async run () {
    await Database.table('course_types').insert([
        {
          "type": "Ao Vivo"
        },
        {
          "type": "Online"
        },
        {
          "type": "Presencial"
        }
    ])
}
}

module.exports = CourseTypeSeeder
