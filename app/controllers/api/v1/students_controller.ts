import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUserValidator } from '#validators/user_validator'
import { errors as authErrors } from '@adonisjs/auth'
import Role from '#models/role'
import Class from '#models/class'
import Student from '#models/student'
import { storeStudentValidator } from '#validators/student_validator'

export default class StudentsController {
  async index({ request, auth }: HttpContext) {
    // return 'hello'
    const user = await auth.authenticateUsing(['api'])
    // const user = await auth.user
    if (user) {
      const roles: Role[] = await user.related('role').query().exec()
      // user?.related('role')
      const adminschoolsId = roles
        ?.filter((role: Role) => role.role === 'admin')
        .map((role) => role.schoolId)
      const classes = await Class.query()
        .whereIn('school_id', adminschoolsId)
        .orWhere('teacher_id', user.id)
        .exec()
      const classesIds = classes.map((sclass) => sclass.id)
      const students = Student.query().whereIn('class_id', classesIds)
      return students
      // const teacherSchoolsClass = await Class.query().whereIn('school_id', adminschoolsId)
    }
  }
  async store({ request }: HttpContext) {
    //should be nullable
    //add fingerprint validation
    const payload = await request.validateUsing(storeStudentValidator)
    const student = await Student.create(payload)
    return student
  }
  async update({ request }: HttpContext) {
    //will not yet implemented
  }
  async sync(ctx: HttpContext) {
    //will get the students data from the post body
    //will then check if students exists
    //will update to the backend
    //then refetch all the students
    return this.index(ctx)
  }
}
