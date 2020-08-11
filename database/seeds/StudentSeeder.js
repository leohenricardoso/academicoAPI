'use strict'

/*
|--------------------------------------------------------------------------
| StudentSeeder
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')


class StudentSeeder {
    static async run () {
        await Database.table('students').insert([
            {
                "full_name": "Leo Henrique",
                "email": "leohenricardoso@hotmail.com",
                "cpf": "11331941957"
            },
            {
                "full_name": "Pedro Diniz Ramos",
                "email": "pedro_diniz_l2@hotmail.com",
                "cpf": "15145396759"
            }
        ])
    }
}
module.exports = StudentSeeder