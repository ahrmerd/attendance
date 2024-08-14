import Role from '#models/role'
import School from '#models/school'
import User from '#models/user'
import { addSchoolValidator, editSchoolValidator } from '#validators/school_validator'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SchoolsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    // const schools = await School.all()
    return inertia.render('schools/schools_index', {
      schools: await School.all(),
    })
  }

  async search({ request }: HttpContext) {
    // const schools = await School.all()
    const search = request.input('q')
    let schoolQuery = School.query()
    if (search) {
      schoolQuery = schoolQuery
        .where('name', 'like', `%${search}%`)
        .orWhere('email', 'like', `%${search}%`)
        .orWhere('phone', 'like', `%${search}%`)
        .orWhere('address', 'like', `%${search}%`)
    }
    const school = await schoolQuery.exec()
    return school
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(addSchoolValidator)
    await db.transaction(async (trx) => {
      const school = await School.create(
        {
          name: payload.name,
          address: payload.address,
          phone: payload.phone,
          email: payload.email,
          status: payload.status,
        },
        { client: trx }
      )
      const user = await User.create(
        {
          fullName: payload.name,
          phone: payload.phone,
          email: payload.email,
          password: payload.password,
        },
        { client: trx }
      )
      await Role.create(
        {
          schoolId: school.id,
          userId: user.id,
          role: 'admin',
        },
        { client: trx }
      )
    })
    return response.redirect().back()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const school = await School.findOrFail(params.id)
    const payload = await request.validateUsing(editSchoolValidator)
    school.merge(payload)
    await school.save()
    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const school = await School.findOrFail(params.id)
    await school.delete()
    return response.redirect().back()
  }
}
