'use strict'

/*
|--------------------------------------------------------------------------
| CourseSpeakerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CourseSpeakerSeeder {
  static async run () {
    await Database.table('course_speakers').insert([
        {
          "name": "Giovana Pagliari",
          "email": "giovanapagliari@hotmail.com",
          "image_path": "https://scontent.fldb3-1.fna.fbcdn.net/v/t1.0-9/117152386_3258954740829049_5555569723569432438_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=bcGND1d2h5YAX8pBFGN&_nc_oc=AQl5ZKPOJZbd5dcabALXaXyBwJmxSAMtT8P9ayfh1OMks1D5Vp8E0xeezAgw3OKU8rukGzuTcVRhiFrpb3uzDrfV&_nc_ht=scontent.fldb3-1.fna&oh=844266e02f38811eca081347f5b7e143&oe=5F595035",
          "description": "Psicologa da Soma",
          "instagram": "https://www.instagram.com/giovanapagliari/",
          "facebook": "https://www.facebook.com/GiiovanaPagliari",
          "linkedin": "https://www.linkedin.com/in/giovana-pagliari-dos-santos-a832521a5/"
        },
        {
          "name": "Vinicius Camargo",
          "email": "www.psicologoviniciuscamargo.com",
          "image_path": "https://s3-sa-east-1.amazonaws.com/doctoralia.com.br/doctor/94698d/94698dfaa39c42157874eee86d9ea769_large.jpg",
          "description": "Psicólogo Clínico",
          "instagram": "https://www.instagram.com/viniiicamargo/?hl=pt-",
          "facebook": "https://www.facebook.com/vinicius.jdc",
          "linkedin": ""
        },
        {
          "name": "Amanda",
          "email": "www.psicologoviniciuscamargo.com",
          "image_path": "https://s3-sa-east-1.amazonaws.com/doctoralia.com.br/doctor/94698d/94698dfaa39c42157874eee86d9ea769_large.jpg",
          "description": "Psicólogo Clínico",
          "instagram": "https://www.instagram.com/viniiicamargo/?hl=pt-",
          "facebook": "https://www.facebook.com/vinicius.jdc",
          "linkedin": ""
        },
        {
          "name": "Vitoria",
          "email": "www.psicologoviniciuscamargo.com",
          "image_path": "https://s3-sa-east-1.amazonaws.com/doctoralia.com.br/doctor/94698d/94698dfaa39c42157874eee86d9ea769_large.jpg",
          "description": "Psicólogo Clínico",
          "instagram": "https://www.instagram.com/viniiicamargo/?hl=pt-",
          "facebook": "https://www.facebook.com/vinicius.jdc",
          "linkedin": ""
        }
    ])
}
}

module.exports = CourseSpeakerSeeder
