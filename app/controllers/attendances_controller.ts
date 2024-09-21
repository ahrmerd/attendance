import type { HttpContext } from '@adonisjs/core/http'
import Attendance from '#models/attendance'
import { DateTime } from 'luxon'

export default class AttendancesController {
  async index({ inertia, request, params }: HttpContext) {

    // const attendance = await Attendance.create({
    //         studentId: 1, 
    //         classId: 1,
    //         clockIn: DateTime.now(),
    //         clockOut:  DateTime.now(),
    //     })

    const classId = params.id
    const page = request.input('page', 1)
    const search = request.input('search')

    let query = Attendance.query()
      .where('class_id', classId)
      .preload('student')
      .preload('class')

    if (search) {
      query = query.whereHas('student', (studentQuery) => {
        studentQuery.where('first_name', 'like', `%${search}%`)
                    .orWhere('last_name', 'like', `%${search}%`)
      })
    }

    const attendances = await query.paginate(page, 10)

    return inertia.render('myschools/school_attendance_index', {
      attendances,
      classId: classId,
    })
  }
}