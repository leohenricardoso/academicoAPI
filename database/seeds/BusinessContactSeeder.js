'use strict'

/*
|--------------------------------------------------------------------------
| BusinessContactSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class BusinessContactSeeder {
  static async run () {
    await Database.table('business_contacts').insert([
      {
        "name": "Pedro Diniz Ramos",
        "cpf": "151.453.967-59",
        "crp": "5156468",
        "email": "pedro_diniz_l2@hotmail.com",
        "subject": "Contratação",
        "message": "Gostaria de apresentar uma palestra"
      },
      {
        "name": "Leonardo Henrique",
        "cpf": "151.453.967-59",
        "crp": "5156468",
        "email": "leohenricardoso2@hotmail.com",
        "subject": "Contratação",
        "message": "Gostaria de apresentar uma palestra"
      }
    ])
  }
}

module.exports = BusinessContactSeeder
