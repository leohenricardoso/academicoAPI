'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Speaker = use('App/Models/CourseSpeaker')
const Database = use('Database')

/**
 * Resourceful controller for interacting with coursespeakers
 */
class CourseSpeakerController {
  /**
   * Show a list of all coursespeakers.
   * GET coursespeakers
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index({
    response,
    auth
  }) {
    return await Speaker.all()
  }

  /**
   * Create/save a new coursespeaker.
   * POST coursespeakers
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

    const speaker = await Speaker.create({
      ...data
    })
  }

  /**
   * Display a single coursespeaker.
   * GET coursespeakers/:id
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
    return await Speaker.findOrFail(params.id)
  }

  /**
   * Update coursespeaker details.
   * PUT or PATCH coursespeakers/:id
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

    const speaker = await Speaker.findOrFail(params.id)
    const data = request.post()
    speaker.merge(data)
    await speaker.save()
    return speaker
  }

  /**
   * Delete a coursespeaker with id.
   * DELETE coursespeakers/:id
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
    const speaker = await Speaker.findOrFail(params.id)
    await speaker.delete()
  }

  /**
   * Show a list of all coursespeakers.
   * GET coursespeakers
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async getSpeakers({
    params,
    response,
    auth
  }) {
    const speakers = await Database
      .from('course_speakers')
      .orderBy('name', 'asc')
      .paginate(params.pages, params.limit)

    return speakers
  }

    /**
   * Show a list of all coursespeakers.
   * POST coursespeakers
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async getSpeakersByName({
    params,
    request,
    response,
    auth
  }) {
    const req = request.only(['name'])

    const speakers = await Database
      .from('course_speakers')
      .where(Database.raw("UPPER(name)"), 'LIKE', '%' + req.name + '%')
      .orderBy('name', 'asc')
      .paginate(params.pages, params.limit)

    return speakers
  }
}

module.exports = CourseSpeakerController
