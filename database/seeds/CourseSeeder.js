'use strict'

/*
|--------------------------------------------------------------------------
| CourseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CourseSeeder {
  static async run () {
    await Database.table('courses').insert([
      {
        "category_id": 1,
        "type_id": 1,
        "speaker_id": 1,
        "name": "Teste 1",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cum id nihil quae excepturi! Cumque eaque consequatur nisi sed voluptatum",
        "image_path": "https://www.boaconsulta.com/blog/wp-content/uploads/2019/01/por-que-procurar-um-psicologo-entenda.jpeg",
        "contents": "yrste",
        "info": "teste tetetetetet tetetetetet; tatatatatatat tatatatta tatatatat; pepepeppepepepep pepepepepepe pepepep; testestestestesteteste;",
        "base_amount": 60.99,
        "discount_amount": 49.99,
        "duration": "2",
        "initial_date": "2021-09-13 21:51:19",
        "final_date": "2021-09-15 21:51:19",
        "online": null,
        "address_street": "Rua Gabriel de Lara",
        "address_number": "517",
        "address_neighborhood": "Jd. Novo Bandeirantes",
        "address_city": "Cambé",
        "address_postcode": "86188-010",
        "address_state": "PR",
        "address_additional_info": "Casa",
        "active": true
        },
        {
          "category_id": 2,
          "type_id": 2,
          "speaker_id": 2,
          "name": "Teste 2",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cum id nihil quae excepturi! Cumque eaque consequatur nisi sed voluptatum",
          "image_path": "https://cristianethiel.com.br/wp-content/uploads/2018/11/Como-a-Psicologia-Pode-Melhorar-suas-Campanhas-de-Marketing-Digital-FB.jpg",
          "contents": "yrste",
          "info": "teste tetetetetet tetetetetet; tatatatatatat tatatatta tatatatat; pepepeppepepepep pepepepepepe pepepep; testestestestesteteste;",
          "base_amount": 60.99,
          "discount_amount": 49.99,
          "duration": "2",
          "initial_date": "2021-09-13 21:51:19",
          "final_date": "2021-09-15 21:51:19",
          "online": null,
          "address_street": "Rua Gabriel de Lara",
          "address_number": "517",
          "address_neighborhood": "Jd. Novo Bandeirantes",
          "address_city": "Cambé",
          "address_postcode": "86188-010",
          "address_state": "PR",
          "address_additional_info": "Casa",
          "active": true
        },
        {
          "category_id": 1,
          "type_id": 1,
          "speaker_id": 1,
          "name": "Teste 3",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cum id nihil quae excepturi! Cumque eaque consequatur nisi sed voluptatum",
          "image_path": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4D-hPbsuZ36_Dp1UfY5Vp_KLcEyogr3EL_g&usqp=CAU",
          "contents": "teste contents",
          "info": "teste tetetetetet tetetetetet; tatatatatatat tatatatta tatatatat; pepepeppepepepep pepepepepepe pepepep; testestestestesteteste;",
          "base_amount": 60.99,
          "discount_amount": 49.99,
          "duration": "2",
          "initial_date": "2021-09-13 21:51:19",
          "final_date": "2021-09-15 21:51:19",
          "online": null,
          "address_street": "Rua Gabriel de Lara",
          "address_number": "517",
          "address_neighborhood": "Jd. Novo Bandeirantes",
          "address_city": "Cambé",
          "address_postcode": "86188-010",
          "address_state": "PR",
          "address_additional_info": "Casa",
          "active": true
        },
        {
          "category_id": 1,
          "type_id": 1,
          "speaker_id": 1,
          "name": "Teste 4",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cum id nihil quae excepturi! Cumque eaque consequatur nisi sed voluptatum",
          "image_path": "https://site.cfp.org.br/wp-content/uploads/2020/07/EntreAgora-1.png",
          "contents": "teste contents",
          "info": "teste tetetetetet tetetetetet; tatatatatatat tatatatta tatatatat; pepepeppepepepep pepepepepepe pepepep; testestestestesteteste;",
          "base_amount": 60.99,
          "discount_amount": 49.99,
          "duration": "2",
          "initial_date": "2021-09-13 21:51:19",
          "final_date": "2021-09-15 21:51:19",
          "online": null,
          "address_street": "Rua Gabriel de Lara",
          "address_number": "517",
          "address_neighborhood": "Jd. Novo Bandeirantes",
          "address_city": "Cambé",
          "address_postcode": "86188-010",
          "address_state": "PR",
          "address_additional_info": "Casa",
          "active": true
        }
    ])
  }
}

module.exports = CourseSeeder
