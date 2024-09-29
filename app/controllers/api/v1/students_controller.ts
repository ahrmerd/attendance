import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import Class from '#models/class'
import Student from '#models/student'
import { storeStudentValidator, verifyStudentValidator } from '#validators/student_validator'

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
  async store({ request, response }: HttpContext) {
    //should be nullable
    //add fingerprint validation
    const payload = await request.validateUsing(storeStudentValidator)
    const classs = await Class.find(payload.classId)
    if (classs !== null) {
      const student = await Student.create({
        classId: payload.classId,
        primaryContact: payload.primaryContact,
        firstName: payload.firstName,
        lastName: payload.firstName,
        finger1: Buffer.from(payload.finger1, 'base64'),
        finger2: Buffer.from(payload.finger2, 'base64'),
        schoolId: classs?.schoolId,
      })
      return student
    }
    return response
      .status(422)
      .send({ errors: [{ message: 'could not add students. The Class could not be found' }] })
  }

  async verifyStudents({ request, response }: HttpContext) {
    //should be nullable
    //add fingerprint validation
    const payload = await request.validateUsing(verifyStudentValidator)
    const buf = Buffer.from(payload.finger, 'base64')
    const students = await Student.query().where('finger1', buf).orWhere('finger2', buf).exec()
    if (students.length > 0) {
      return students[0]
    }
    return response.status(422).send({ errors: [{ message: 'No Student Found' }] })
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
