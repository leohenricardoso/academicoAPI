'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BannerSchema extends Schema {
  up () {
    this.create('banners', (table) => {
      table.increments()
      table.string('image_path', 600)
      table.timestamps()
    })
  }

  down () {
    this.drop('banners')
  }
}

module.exports = BannerSchema
