import type { HttpContext } from '@adonisjs/core/http'

import Role from '#models/role'
import { addRoleValidator, editRoleValidator } from '#validators/roles_validator'

export default class RolesController {
  async index({ inertia, request, auth }: HttpContext) {
    const authUserRoles = await auth.user?.related('role').query().exec()
    const schoolsId = authUserRoles?.map((role) => role.schoolId) ?? []
    // const schoolTeachers = (await Role.query()
    // .whereIn('school_id', schoolsId)
    // .preload('user').exec())
    const page = request.input('page', 1)
    const search = request.input('search')
    let query = Role.query()
    query = query.preload('user').preload('school').whereIn('school_id', schoolsId)
    if (search) {
      query
        // .preload('user', (userQuery) => {
        //   userQuery
        //     .where('full_name', 'like', `%${search}%`)
        //     .orWhere('email', 'like', `%${search}%`)
        //     .orWhere('phone', 'like', `%${search}%`)
        // })
        // .preload('school', (schoolQuery) => {
        //   schoolQuery
        //     .where('name', 'like', `%${search}%`)
        //     .orWhere('email', 'like', `%${search}%`)
        //     .orWhere('phone', 'like', `%${search}%`)
        //     .orWhere('address', 'like', `%${search}%`)
        // })
        .where('role', 'like', `%${search}%`)
    }
    // console.log(await query.paginate)

    const roles = await query.paginate(page)
    return inertia.render('myschools/roles_index', {
      roles,
    })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(addRoleValidator)
    // payload.password = await hash.make(payload.password)
    const searchPayload = { schoolId: payload.schoolId, userId: payload.userId }
    const persistancePayload = { role: payload.role }
    await Role.updateOrCreate(searchPayload, persistancePayload)
    return response.redirect().back()
  }

  async update({ params, request, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    const payload = await request.validateUsing(editRoleValidator)
    role.role = payload.role
    await role.save()
    return response.redirect().back()
  }

  async destroy({ params, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    await role.delete()
    return response.redirect().back()
  }
}
