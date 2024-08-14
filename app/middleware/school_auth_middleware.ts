import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

export default class SchoolAuthMiddleware {
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    const user = await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    // const user = ctx.auth.user
    const role = await user.related('role').query().first()
    if (!role || role.role !== 'admin') {
      return ctx.response.redirect().toRoute('notSchool')
    }
    return next()
  }
}
