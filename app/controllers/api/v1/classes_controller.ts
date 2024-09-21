import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import Class from '#models/class'

export default class ClassesController {
  async index({ request, auth }: HttpContext) {
    //should add schoolId to attendance
    const user = await auth.user
    if (user) {
      const roles: Role[] = await user.related('role').query().exec()
      // let classQuery = Class.query().preload('school').preload('teacher')
      // const schoolsId = roles?.map((role) => role.schoolId) ?? []
      // const classes = await classQuery.whereIn('id', schoolsId).exec()

      const adminschoolsId = roles
        ?.filter((role: Role) => role.role === 'admin')
        .map((role) => role.schoolId)
      const classes = await Class.query()
        .preload('school')
        .whereIn('school_id', adminschoolsId)
        .orWhere('teacher_id', user.id)
        .exec()
      // user?.related('role')
      // const adminschoolsId = roles
      //   ?.filter((role: Role) => role.role === 'admin')
      //   .map((role) => role.schoolId)
      // const classes = await Class.query()
      //   .whereIn('school_id', adminschoolsId)
      // .orWhere('teacher_id', user.id)
      //   .exec()
      // const classesIds = classes.map((sclass) => sclass.id)
      // const students = Student.query().whereIn('class_id', classesIds)
      return classes
      // const teacherSchoolsClass = await Class.query().whereIn('school_id', adminschoolsId)
    }
  }
}
