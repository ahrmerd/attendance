import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Role from '#models/role'
import Class from '#models/class'
import Student from '#models/student'
import vine from '@vinejs/vine'
import sms_services from '#services/sms_services'
import Attendance from '#models/attendance'
import { DateTime } from 'luxon'

export default class AttendancesController {
  async index({ request, auth }: HttpContext) {
    //should add schoolId to attendance
    const user = await auth.user
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
      const attendances = Attendance.query().preload('student').whereIn('class_id', classesIds)
      return attendances
      // const teacherSchoolsClass = await Class.query().whereIn('school_id', adminschoolsId)
    }
  }

  async classIndex({ request, auth, params }: HttpContext) {
    //should add schoolId to attendance
    const classId = params.id
    const user = await auth.user
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
      const attendances = Attendance.query()
        .preload('student')
        .whereIn('class_id', classesIds)
        .where('class_id', classId)
      return attendances
      // const teacherSchoolsClass = await Class.query().whereIn('school_id', adminschoolsId)
    }
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(
      vine.compile(
        vine.object({
          studentId: vine.number(),
          finger: vine.string(),
        })
      )
    )
    const student = await Student.findOrFail(payload.studentId)
    //a method that does the checks to ensure that a student
    if (
      student.finger1.toString('base64') !== payload.finger &&
      student.finger2.toString('base64') !== payload.finger
    ) {
      return response.status(412).send({ errors: [{ message: 'Invalid Finger Data' }] })
    }
    if (student.status === 'active') {
      const attendance = await Attendance.create({
        studentId: student.id,
        classId: student.classId,
        clockIn: DateTime.now(),
      })
      await sms_services.sendToStudent(
        student,
        `Your ward ${student.firstName + ' ' + student.lastName} has just arrived the school premisis at ${attendance.clockIn}`
      )
    }
    return response.status(412).send({ errors: [{ message: 'The Student is not Active' }] })
  }
}
