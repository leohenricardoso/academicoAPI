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

    let category = await Category.findOrFail(data['category_id'])
    data['category_label'] = category['category']

    let type = await Type.findOrFail(data['type_id'])
    data['type_label'] = type['type']

    let speaker = await Speaker.findOrFail(data['speaker_id'])
    data['speaker_label'] = speaker['name']


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
  async update ({ params, request, response, auth }) {
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
  async saveImage ({ params, request, response, auth }) {

    if (!auth.user.id) {
      return response.status(401)
    }

    const course = await Course.findOrFail(params.id)

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await image.move(Helpers.tmpPath('img/course'),{
      name: `${Date.now()}-${image.clientName}`
    })

    if (!image.moved()) {
      return image.errors()
    }

    let data = {
      image_path: `ìmg/course/${image.fileName}`
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
        active: true
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

  /**
   * Get courses with prices.
   * courses-price/:price_min/:price_max
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getCoursesByPrice({ params, auth, response }) {

    if (!auth.user.id) {
      return response.status(401)
    }
    let price_min = params.price_min
    let price_max = params.price_max

    let courses = await Database
      .from('courses')
      .whereBetween(
      'discount_amount',
        [
          `${price_min}`,
          `${price_max}`
        ]
      )

    return courses
  }

    /**
   * Get courses with prices.
   * courses-date/:date
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getCoursesByDate({ params, auth, response }) {

    if (!auth.user.id) {
      return response.status(401)
    }
    let date = params.date

    let courses = await Database
      .from('courses')
      .where( 'initial_date', '>=', `${date}`)
      .where({
        active: 1
      })
      .orderBy('initial_date', 'asc')

    return courses
  }
  /**
   * Get courses with price-asc.
   * price-asc
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getPriceAsc({ auth, response }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    let course = await Database
    .from('courses')
    .where({
      active: 1
    })
    .orderBy('discount_amount', 'asc')

    return await course

  }

  /**
   * Get courses with price-desc.
   * price-desc
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getPriceDesc({ auth, response }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    let course = await Database
    .from('courses')
    .where({
      active: 1
    })
    .orderBy('discount_amount', 'desc')

    return await course

  }

  /**
   * Get courses with name-asc.
   * name-asc
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getNameAsc({ auth, response, params }) {
    if (!auth.user.id) {
      return response.status(401)
    }
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
   * Get courses with name-asc.
   * name-asc
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getNameDesc({ auth, response }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    let courses = await Database
    .from('courses')
    .where({
      active: 1
    })
    .orderBy('name', 'desc')
    .paginate(params.pages, params.limit)

    return await courses

  }
  /**
   * Get courses with duration-desc.
   * duration-desc
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getDurationDesc({ auth, response }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    let course = await Database
    .from('courses')
    .where({
      active: 1
    })
    .orderBy('duration', 'desc')

    return await course

  }

    /**
   * Get courses with duration-asc.
   * duration-asc
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getDurationAsc({ auth, response }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    let course = await Database
    .from('courses')
    .where({
      active: 1
    })
    .orderBy('duration', 'asc')

    return await course

  }
  /**
   * Get courses with duration-asc.
   * duration-asc
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getCourseLive({ params, auth, response }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    let courses = await Database
    .from('courses')
    .where({
      type_id: 1
    })
    .orderBy('initial_date', 'asc')
    .paginate(params.pages, params.limit)

    return courses

  }
    /**
   * Get courses with duration-asc.
   * duration-asc
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getCoursesIndex({ params, auth, response }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    let courses = await Database
    .from('courses')
    .whereNot('type_id', '<', 2)
    .paginate(params.pages, params.limit)

    return courses

  }

  /**
   * Get courses with filters.
   *
   *
   * @param {object} ctx
   * @param {Auth} ctx.request
   * @param {Response} ctx.response
   */
  async getCoursesFilter({ params, auth, response, request }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    const filterRequest = request.all()
    let filters = {}
    var order = 'name'

    if (filterRequest.category != undefined && filterRequest.category != null) {
      filters.category_id = filterRequest.category
    }

    if (filterRequest.type != undefined && filterRequest.type != null) {
      filters.type_id = filterRequest.type
    }

    if (filterRequest.speaker != undefined && filterRequest.speaker != null) {
      filters.speaker_id = filterRequest.speaker
    }

    if (filterRequest.name != undefined && filterRequest.name != null) {
      filters.name = filterRequest.name
    }

    if (filterRequest.order) {
      order = filterRequest.order
    }

    Logger.info(filters)

    let courses = await Database
      .from('courses')
      .where(filters)
      .orderBy(order, 'asc')
      .paginate(params.pages, params.limit)

    return courses
  }
}

module.exports = CourseController
