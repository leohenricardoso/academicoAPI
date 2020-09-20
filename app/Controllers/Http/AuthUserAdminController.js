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

}

module.exports = AuthUserAdminController
