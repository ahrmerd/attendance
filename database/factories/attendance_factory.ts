import factory from '@adonisjs/lucid/factories'
import Attendance from '#models/attendance'

export const AttendanceFactory = factory
  .define(Attendance, async ({ faker }) => {
    return {}
  })
  .build()
