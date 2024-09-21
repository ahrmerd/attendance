import User from '#models/user'
import Role from '#models/role'
import Class from '#models/class'
import Student from '#models/student'
import vine from '@vinejs/vine'
import sms_services from '#services/sms_services'
import Attendance from '#models/attendance'
import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import School from '#models/school'

export default class DownloadsController {
  async index({ request, auth }: HttpContext) {
    //should add schoolId to attendance
    //not working
    const user = await auth.user
    if (user) {
      const roles: Role[] = await user.related('role').query().exec()
      const schoolsId = roles?.map((role) => role.schoolId) ?? []
      const adminschoolsId = roles
        ?.filter((role: Role) => role.role === 'admin')
        .map((role) => role.schoolId)
      const schools = await School.query().whereIn('id', schoolsId).exec()
      const classes = await Class.query()
        .preload('school')
        .whereIn('school_id', adminschoolsId)
        .orWhere('teacher_id', user.id)
        .exec()
      // let classQuery = Class.query().preload('school').preload('teacher')
      // const classes = await classQuery.whereIn('id', schoolsId).exec()
      const classesIds = classes.map((sclass) => sclass.id)
      const students = await Student.query().whereIn('class_id', classesIds)
      const studentsIds = students.map((student) => student.id)

      const attendance = await Attendance.query().where('student_id', studentsIds)
      return {
        user,
        schools,
        classes,
        students,
        attendance,
        //should also add attendance
      }
      // const teacherSchoolsClass = await Class.query().whereIn('school_id', adminschoolsId)
    }
  }
}
