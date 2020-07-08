'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Course = use('App/Models/Course')
const Database = use('Database')
/**
 * Resourceful controller for interacting with courses
 */
class CourseController {
  /**
   * Show a list of all courses.
   * GET courses
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
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
   * @param {Auth} ctx.auth
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
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
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
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
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
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const course = await Course.findOrFail(params.id)
    await course.delete()
  }

    /**
   * Get courses with category id.
   * courses-category/:category_id
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getCoursesByCategoryId({ params, auth, response }) {

    if (!auth.user.id) {
      return response.status(401)
    }

    let courses = await Database
      .from('courses')
      .where({
        category_id: params.category_id
      })

    return courses
  }

  /**
   * Get courses with where like clause in event name.
   * courses-search/:name
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */

  async getCoursesByName({ params, auth, response }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    let name = params.name
    name = name.toUpperCase()

    let courses = await Database
      .from('courses')
      .where(Database.raw("UPPER(name)"), 'LIKE', '%' + name + '%')
      .where({
        status: 1
      })
      .orderBy('created_at', 'asc')
      .paginate(params.pages, params.limit)

    return courses
  }
      /**
   * Get courses with type id.
   * courses-type/:type_id
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getCoursesByTypeId({ params, auth, response }) {

    if (!auth.user.id) {
      return response.status(401)
    }

    let courses = await Database
      .from('courses')
      .where({
        type_id: params.type_id
      })

    return courses
  }
  /**
   * Get courses with speaker id.
   * courses-speaker/:speaker_id
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getCoursesBySpeakerId({ params, auth, response }) {

    if (!auth.user.id) {
      return response.status(401)
    }

    let courses = await Database
      .from('courses')
      .where({
        speaker_id: params.speaker_id
      })

    return courses
  }
}

module.exports = CourseController
