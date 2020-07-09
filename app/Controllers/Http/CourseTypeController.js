'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const CourseType = use('App/Models/CourseType')
/**
 * Resourceful controller for interacting with coursetypes
 */
class CourseTypeController {
  /**
   * Show a list of all coursetypes.
   * GET coursetypes
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index ({ response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

      return await CourseType.all()
    }


  /**
   * Create/save a new coursetype.
   * POST coursetypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store ({ request, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    const data = request.post()

    const coursetype = await CourseType.create({
      ...data
    })
  }

  /**
   * Display a single coursetype.
   * GET coursetypes/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async show ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    return await CourseType.findOrFail(params.id)
  }

  /**
   * Update coursetype details.
   * PUT or PATCH coursetypes/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update ({ params, request, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const coursetype = await CourseType.findOrFail(params.id)
    const data = request.post()
    coursetype.merge(data)
    await coursetype.save()
    return coursetype
  }

  /**
   * Delete a coursetype with id.
   * DELETE coursetypes/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const coursetype = await CourseType.findOrFail(params.id)
    await coursetype.delete()
  }
}

module.exports = CourseTypeController
