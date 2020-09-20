'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Student = use('App/Models/Student')

const Database = use('Database')
const Logger = use('Logger')
/**
 * Resourceful controller for interacting with students
 */
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index({
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
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
   * @param {Auth} ctx.auth
   */
  async store({
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
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
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async show({
    params,
    response,
    auth
  }) {
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
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update({
    params,
    request,
    response,
    auth
  }) {
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
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy({
    params,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const student = await Student.findOrFail(params.id)
    await student.delete()
  }

  async searchStudent({
    params,
    request,
    response,
    auth
  }) {
    try {
      Logger.info('entrou aqui')
      const filterRequest = request.post()
      var students

      if (filterRequest.student_email != undefined && filterRequest.student_email != null) {
        students = await Database
          .from('students')
          .where(Database.raw("UPPER(email)"), 'LIKE', '%' + filterRequest.student_email + '%')
          .orderBy('email', 'asc')
          .paginate(params.pages, params.limit)
      } else {
        students = await Database
          .from('students')
          .orderBy('email', 'asc')
          .paginate(params.pages, params.limit)
      }

      return students
    } catch (error) {
      Logger.info(error)
    }
  }
}

module.exports = StudentController
