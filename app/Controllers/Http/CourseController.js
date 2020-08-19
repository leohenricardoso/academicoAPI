'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Course = use('App/Models/Course')
const Category = use('App/Models/CourseCategory')
const Type = use('App/Models/CourseType')
const Speaker = use('App/Models/CourseSpeaker')
const Database = use('Database')
const Helpers = use('Helpers')
const Logger = use('Logger')

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
  async index({
    response,
    auth
  }) {
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
  async store({
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const data = request.post()

    let category = await Category.findOrFail(data['category_id'])
    data['category_label'] = category['category']

    let type = await Type.findOrFail(data['type_id'])
    data['type_label'] = type['type']

    let speaker = await Speaker.findOrFail(data['speaker_id'])
    data['speaker_label'] = speaker['name']


    const course = await Course.create({
      ...data
    })

    return course
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
  async show({
    params,
    response,
    auth
  }) {
    let course = await Course.findOrFail(params.id)
    return course
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
  async update({
    params,
    request,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const course = await Course.findOrFail(params.id)
    const data = request.post()

    let category = await Category.findOrFail(data['category_id'])
    data['category_label'] = category['category']

    let type = await Type.findOrFail(data['type_id'])
    data['type_label'] = type['type']

    let speaker = await Speaker.findOrFail(data['speaker_id'])
    data['speaker_label'] = speaker['name']

    course.merge(data)
    await course.save()
    return course
  }

  /**
   * Save Course image.
   * POST courses-image/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async saveImage({
    params,
    request,
    response,
    auth
  }) {

    if (!auth.user.id) {
      return response.status(401)
    }

    const course = await Course.findOrFail(params.id)

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await image.move(Helpers.publicPath('img/course'), {
      name: `${Date.now()}-${image.clientName}`
    })

    if (!image.moved()) {
      return image.errors()
    }

    let data = {
      image_path: `${image.fileName}`
    }

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
  async destroy({
    params,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    const course = await Course.findOrFail(params.id)
    await course.delete()
  }

  /**
   * Get courses with name-asc.
   * name-asc
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getNameAsc({
    auth,
    response,
    params
  }) {
    let courses = await Database
      .from('courses')
      .where({
        active: 1
      })
      .orderBy('name', 'asc')
      .paginate(params.pages, params.limit)

    return await courses

  }

  /**
   * Get courses with filters.
   *
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getCoursesFilter({
    request,
    params,
    response,
    auth
  }) {
    const filterRequest = request.post()
    var filters = {}
    var order = 'name'
    var orderDirection = 'asc'
    var courseName

    if (filterRequest.category_id != undefined && filterRequest.category_id != null) {
      filters.category_id = filterRequest.category_id
    }

    if (filterRequest.type_id != undefined && filterRequest.type_id != null) {
      filters.type_id = filterRequest.type_id
    }

    if (filterRequest.speaker_id != undefined && filterRequest.speaker_id != null) {
      filters.speaker_id = filterRequest.speaker_id
    }

    if (filterRequest.name != undefined && filterRequest.name != null) {
      courseName = filterRequest.name
    }

    if (filterRequest.order) {
      order = filterRequest.order.field
      orderDirection = filterRequest.order.direction
    }

    let courses = {}

    if (courseName) {
      courses = await Database
        .from('courses')
        .where(filters)
        .where(Database.raw("UPPER(name)"), 'LIKE', '%' + courseName + '%')
        .orderBy(order, orderDirection)
        .paginate(params.pages, params.limit)
    } else {
      courses = await Database
        .from('courses')
        .where(filters)
        .orderBy(order, orderDirection)
        .paginate(params.pages, params.limit)
    }

    return courses
  }

  /**
   * Get courses with highlight.
   *
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getHighlight({
    auth,
    response,
    params
  }) {
    let courses = await Database
      .from('courses')
      .where({
        highlight: 1
      })
      .paginate(params.pages, params.limit)

    return await courses
  }

  /**
   * Get courses with recorded.
   *
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getRecorded({
    auth,
    response,
    params
  }) {
    let courses = await Database
      .from('courses')
      .where({
        recorded: 1
      })
      .paginate(params.pages, params.limit)

    return await courses
  }

  async downloadImage({
    params,
    response
  }) {
    return response.download(Helpers.publicPath(`img/course/${params.path}`))
  }
}

module.exports = CourseController
