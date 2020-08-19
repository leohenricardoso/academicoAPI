'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Banner = use('App/Models/Banner')
const Helpers = use('Helpers')
const Database = use('Database')

/**
 * Resourceful controller for interacting with banners
 */
class BannerController {
  /**
   * Show a list of all banners.
   * GET banners
   *
   * @param {object} ctx
   * @param {Request} ctx.auth
   * @param {Response} ctx.response
   */
  async index ({ response, auth }) {
    return await Banner.all()
  }

  /**
   * Create/save a new banner.
   * POST banners
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    const data = request.post()

    const banner = await Banner.create({
      ...data
    })
  }

  /**
   * Display a single banner.
   * GET banners/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, auth }) {
    let banner = await Banner.findOrFail(params.id)

    return banner
  }

  /**
   * Update banner details.
   * PUT or PATCH banners/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const banner = await Banner.findOrFail(params.id)
    const data = request.post()

    banner.merge(data)
    await banner.save()
    return banner
  }

  /**
   * Delete a banner with id.
   * DELETE banners/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const banner = await Banner.findOrFail(params.id)
    await banner.delete()
  }

  async saveImage ({ request, response, auth }) {

    if (!auth.user.id) {
      return response.status(401)
    }

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await image.move(Helpers.publicPath('img/banner'),{
      name: `${Date.now()}-${image.clientName}`
    })

    if (!image.moved()) {
       return image.errors()
    }

    let data = {
      image_path: `${image.fileName}`
    }

    const banner = await Banner.create({
      ...data
    })

    return banner
  }

  async downloadImage ({ params, response }) {
    return response.download(Helpers.publicPath(`img/banner/${params.path}`))
  }
}

module.exports = BannerController
