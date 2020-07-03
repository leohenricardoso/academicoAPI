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
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    return await Speaker.all()
  }

  /**
   * Create/save a new coursespeaker.
   * POST coursespeakers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
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
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }

    return await Speaker.findOrFail(params.id)
  }

  /**
   * Update coursespeaker details.
   * PUT or PATCH coursespeakers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
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
   * @param {Request} ctx.request
   * @param {Response} ctx.response
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
}

module.exports = CourseSpeakerController
