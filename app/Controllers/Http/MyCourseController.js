'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MyCourse = use('App/Models/MyCourse')
/**
 * Resourceful controller for interacting with mycourses
 */
class MyCourseController {
  /**
   * Show a list of all mycourses.
   * GET mycourses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

      return await MyCourse.all()
  }

  /**
   * Create/save a new mycourse.
   * POST mycourses
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

    const mycourse = await MyCourse.create({
      ...data
    })
  }

  /**
   * Display a single mycourse.
   * GET mycourses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    return await MyCourse.findOrFail(params.id)
  }

  /**
   * Update mycourse details.
   * PUT or PATCH mycourses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const mycourse = await MyCourse.findOrFail(params.id)
    const data = request.post()
    mycourse.merge(data)
    await mycourse.save()
    return mycourse
  }

  /**
   * Delete a mycourse with id.
   * DELETE mycourses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const mycourse = await MyCourse.findOrFail(params.id)
    await mycourse.delete()
  }
}

module.exports = MyCourseController
