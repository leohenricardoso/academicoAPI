'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use('App/Models/CourseCategory')
const Database = use('Database')

/**
 * Resourceful controller for interacting with coursecategories
 */
class CourseCategoryController {
  /**
   * Show a list of all coursecategories.
   * GET coursecategories
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index({
    response,
    auth
  }) {
    if (!auth.user.id) {
      return response.status(401)
    }
    return await Category.all()
  }

  /**
   * Create/save a new coursecategory.
   * POST coursecategories
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

    const data = request.only([
      'category'
    ])

    const category = await Category.create({
      ...data
    })
  }

  /**
   * Display a single coursecategory.
   * GET coursecategories/:id
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

    return await Category.findOrFail(params.id)
  }

  /**
   * Update coursecategory details.
   * PUT or PATCH coursecategories/:id
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

    const category = await Category.findOrFail(params.id)
    const data = request.only([
      'category'
    ])

    category.merge(data)
    await category.save()
    return category
  }

  /**
   * Delete a coursecategory with id.
   * DELETE coursecategories/:id
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

    const category = await Category.findOrFail(params.id)
    await category.delete()
  }
}

module.exports = CourseCategoryController
