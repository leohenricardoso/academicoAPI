'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const StudentSeeder = use('./StudentSeeder')
const CourseSpeakerSeeder = use('./CourseSpeakerSeeder')
const CourseCategorySeeder = use('./CourseCategorySeeder')
const CourseTypeSeeder = use('./CourseTypeSeeder')
const CourseSeeder = use('./CourseSeeder')
const BusinessContact = use('./BusinessContact')

class DatabaseSeeder {
  async run () {
    await StudentSeeder.run()
    await CourseSpeakerSeeder.run()
    await CourseCategorySeeder.run()
    await CourseTypeSeeder.run()
    await CourseSeeder.run()
    await BusinessContact.run()
  }
}

module.exports = DatabaseSeeder
