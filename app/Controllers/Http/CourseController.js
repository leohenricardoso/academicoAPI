'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Course = use('App/Models/Course')
/**
 * Resourceful controller for interacting with courses
 */
class CourseController {
  /**
   * Show a list of all courses.
   * GET courses
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

      return await Course.all()
    }

  /**
   * Create/save a new course.
   * POST courses
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

    const course = await Course.create({
      ...data
    })
  }

  /**
   * Display a single course.
   * GET courses/:id
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

    return await Course.findOrFail(params.id)
  }

  /**
   * Update course details.
   * PUT or PATCH courses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const course = await Course.findOrFail(params.id)
    const data = request.post()
    course.merge(data)
    await course.save()
    return course
  }

  /**
   * Delete a course with id.
   * DELETE courses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const course = await Course.findOrFail(params.id)
    await course.delete()
  }
}

module.exports = CourseController
