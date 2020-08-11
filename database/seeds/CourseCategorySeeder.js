'use strict'

/*
|--------------------------------------------------------------------------
| CourseCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CourseCategorySeeder {
  async run () {
    await Database.table('course_categories').insert([
      {
        "category": "Palestras",
      },
      {
        "category": "Grupo de estudo",
      },
      {
        "category": "Curso",
      },
    ])
  }
}

module.exports = CourseCategorySeeder
