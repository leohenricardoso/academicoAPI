'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Student = use('App/Models/Student')
/**
 * Resourceful controller for interacting with students
 */
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

      return await Student.all()
  }

  /**
   * Create/save a new student.
   * POST students
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

    const student = await Student.create({
      ...data
    })
  }

  /**
   * Display a single student.
   * GET students/:id
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

    return await Student.findOrFail(params.id)
  }


  /**
   * Update student details.
   * PUT or PATCH students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const student = await Student.findOrFail(params.id)
    const data = request.post()
    student.merge(data)
    await student.save()
    return student
  }

  /**
   * Delete a student with id.
   * DELETE students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const student = await Student.findOrFail(params.id)
    await student.delete()
  }
}

module.exports = StudentController
