// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { registerUserValidator } from '#validators/user_validator'
import { HttpContext } from '@adonisjs/core/http'
// import hash from '@adonisjs/core/services/hash'

export default class RegisterUsersController {
  async create({ inertia }: HttpContext) {
    return inertia.render('register')
    // return list of posts
  }
  async register({ response, request, auth }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    // payload.password = await hash.make(payload.password)
    const user = await User.create(payload)
    await auth.use('web').login(user)
    return response.redirect().toRoute('dashboard')

    // return inertia.render('login')
    // return list of posts
  }
}
