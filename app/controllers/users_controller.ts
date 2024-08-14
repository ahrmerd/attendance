import User from '#models/user'
import {
  changePasswordValidator,
  editUserValidator,
  registerUserValidator,
} from '#validators/user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const search = request.input('search')
    let usersQuery = User.query()
    if (search) {
      usersQuery = usersQuery
        .where('full_name', 'like', `%${search}%`)
        .orWhere('email', 'like', `%${search}%`)
        .orWhere('phone', 'like', `%${search}%`)
    }
    const users = await usersQuery.paginate(page, 10)
    return inertia.render('users/users_index', {
      users,
    })
  }

  async search({ request }: HttpContext) {
    // const page = request.input('page', 1)
    const search = request.input('q')
    let usersQuery = User.query()
    if (search) {
      usersQuery = usersQuery
        .where('full_name', 'like', `%${search}%`)
        .orWhere('email', 'like', `%${search}%`)
        .orWhere('phone', 'like', `%${search}%`)
    }
    const users = await usersQuery.exec()
    return users
    // return inertia.render('users/users_index', {
    //   users,
    // })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    // payload.password = await hash.make(payload.password)
    await User.create(payload)
    return response.redirect().back()
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(editUserValidator)
    user.merge(payload)
    await user.save()
    return response.redirect().back()
  }

  async changePassword({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(changePasswordValidator)
    user.password = payload.password
    await user.save()
    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.redirect().back()
  }
}
