import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUserValidator } from '#validators/user_validator'
import { errors as authErrors } from '@adonisjs/auth'

export default class LoginController {
  async login({ inertia, request, session, ...ctx }: HttpContext) {
    // console.log(auth.user)
    // auth.use('web').logout()

    const payload = await request.validateUsing(loginUserValidator)
    try {
      const user = await User.verifyCredentials(payload.email, payload.password)
      const oldTokens = await User.accessTokens.all(user)
      for (const oldToken of oldTokens) {
        await User.accessTokens.delete(user, oldToken.identifier)
      }
      const token = await User.accessTokens.create(user)
      return token
    } catch (error) {
      if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
        session.flash('errors', { email: 'invalid creds' })
        return ctx.response.redirect().back()
        // console.log();
        // throw new vineErrors.E_VALIDATION_ERROR([error.message])
        // return ctx.response.status(error.status).send(error.getResponseMessage(error, ctx))
      }
      throw error
      //   return super.handle(error, ctx)
    }
    // return ctx.response.redirect().toRoute('dashboard')
    // payload.password = await hash.make(payload.password)
    // console.log('yees')
    // console.log('yees')

    // return auth.user
    // return inertia.render('register')
    // return list of posts
  }
}
