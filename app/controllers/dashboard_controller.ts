import Class from '#models/class'
import Role from '#models/role'
import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const schools = await db.from('schools').count('* as total').exec()

    //return;
    const users = await db.from('users').count('* as total').exec()
    const roles = await db.from('roles').count('* as total').exec()
    return inertia.render('admin/dashboard', {
      version: 6,
      schools: schools[0].total,
      users: users[0].total,
      roles: roles[0].total,
    })
  }

  async schoolDashboard({ inertia, auth }: HttpContext) {
    const role: Role[] = await auth.user?.related('role').query().exec()
    const schoolsId = role?.map((role) => role.schoolId) ?? []
    const classes = await Class.query().whereIn('schoolId', schoolsId)
    const students = await Student.query().whereIn('schoolId', schoolsId)
    const staff = await Role.query().whereIn('schoolId', schoolsId)

    return inertia.render('myschools/my_school_dashboard', {
      classes: classes,
      students: students,
      staff: staff,
    })
  }
}
