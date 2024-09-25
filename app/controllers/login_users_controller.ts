import User from '#models/user'
import { loginUserValidator } from '#validators/user_validator'
import { errors as authErrors } from '@adonisjs/auth'
// import { errors } from '@adonisjs/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginUsersController {
  async create({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async logout(ctx: HttpContext) {
    ctx.auth.use('web').logout()
    return ctx.response.redirect().toRoute('login')
  }

  async login({ inertia, request, auth, session, ...ctx }: HttpContext) {
    // console.log(auth.user)
    // auth.use('web').logout()

    const payload = await request.validateUsing(loginUserValidator)
    try {
      const user = await User.verifyCredentials(payload.email, payload.password)
      await auth.use('web').login(user)
      if (user.isSystemAdmin) {
        return ctx.response.redirect().toRoute('dashboard')
      }
      return ctx.response.redirect().toRoute('myschools')

    } catch (error) {
      if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
        session.flash('errors', { email: 'invalid credentials. Please check your credentials and try again' })
        return ctx.response.redirect().back()
        // console.log();
        // throw new vineErrors.E_VALIDATION_ERROR([error.message])
        // return ctx.response.status(error.status).send(error.getResponseMessage(error, ctx))
      }
      throw error
      //   return super.handle(error, ctx)
    }
    //if(user.i)
    // payload.password = await hash.make(payload.password)
    // console.log('yees')
    // console.log('yees')

    // return auth.user
    // return inertia.render('register')
    // return list of posts
  }
}
