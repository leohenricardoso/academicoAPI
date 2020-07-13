'use strict'

const UserAdmin = use('App/Models/UserAdmin')

class AuthUserAdminController {

   /**
   * Register new admin user.
   * POST admin-user-register
   *
   * @param {Request} ctx.request
   */
  async register({
    request
  }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await UserAdmin.create(data)
    return user
  }

  /**
   * Authenticate admin user using JWT. -> auth:admin
   * POST admin-user-authenticate
   *
   * @param {Request} ctx.request
   */
  async authenticate({
    request,
    auth
  }) {
    const {
      email,
      password
    } = request.all()

    const authAdmin = auth.authenticator("admin")

    const token = await authAdmin.attempt(email, password)
    return token
  }

   /**
   * Show a list of all admin users.
   * GET admin-user
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index ({ response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }
    return await UserAdmin.all()
  }

  /**
   * Display a single contact.
   * GET admin-user/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async show ({ params, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    return await UserAdmin.findOrFail(params.id)

  }

  /**
   * Update admin user.
   * PUT admin-user/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update ({ params, request, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }

    const user = await UserAdmin.findOrFail(params.id)
    const data = request.only([
      'username', 'email', 'password'
    ])

    user.merge(data)
    await user.save()

    return user
  }

  /**
   * Delete an admin user with id.
   * DELETE admin-user/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy ({ params, response, auth }) {
    if(!auth.user.id) {
      return response.status(401)
    }
    const user = await UserAdmin.findOrFail(params.id)
    await user.delete()
  }
}

module.exports = AuthUserAdminController
