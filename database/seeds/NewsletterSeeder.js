'use strict'

/*
|--------------------------------------------------------------------------
| NewsletterSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class NewsletterSeeder {
  static async run () {
    await Database.table('newsletters').insert([
      {
        "email": "pedro_diniz_l2@hotmail.com",
        "active": true,
      },
      {
        "email": "leohenricardoso@hotmail.com",
        "active": true,
      }
    ])
  }
}

module.exports = NewsletterSeeder
