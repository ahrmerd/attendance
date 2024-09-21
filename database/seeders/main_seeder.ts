import { AttendanceFactory } from '#database/factories/attendance_factory'
import { ClassFactory } from '#database/factories/class_factory'
import { SchoolFactory } from '#database/factories/school_factory'
import { StudentFactory } from '#database/factories/student_factory'
import { UserFactory } from '#database/factories/user_factory'
import Attendance from '#models/attendance'
import Class from '#models/class'
import Role from '#models/role'
import School from '#models/school'
import Student from '#models/student'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

const createStudents = async (school: School, classs: Class) => {
  return await StudentFactory.merge({
    schoolId: school.id,
    classId: classs.id,
    status: 'active',
  }).createMany(6)
}

const createStudentsForClasses = async (school: School, classes: Class[]) => {
  const students: Student[] = []
  for (const classs of classes) {
    students.push(...(await createStudents(school, classs)))
  }
  return students
}

const createStaffs = async (school: School) => {
  const user = await UserFactory.merge({
    isSystemAdmin: false,
    phone: school.phone,
  }).create()
  Role.create({ schoolId: school.id, userId: user.id, role: 'admin' })
  const schoolTeachers = await UserFactory.merge({ isSystemAdmin: false }).createMany(4)
  return schoolTeachers
}

const createAdminUsers = async () => {
  await User.create({
    fullName: 'admin',
    email: 'admin@admin.com',
    phone: '12345678',
    password: 'password',
  })
  await UserFactory.merge({ isSystemAdmin: true }).createMany(3)
}

const createAttendanceForStudents = async (students: Student[]) => {
  const daysDate = DateTime.now().minus({ days: 6 })
  for (let index = 0; index < 6; index++) {
    for (const student of students) {
      await Attendance.create({
        studentId: student.id,
        classId: student.classId,
        clockIn: daysDate.plus({ day: index }),
      })
    }
    // await AttendanceFactory.createMany(6)
  }
}

const attachRoleToTeachers = async (school: School, schoolTeachers: User[]) => {
  const classes: Class[] = []
  for (const [index, teacher] of schoolTeachers.entries()) {
    await Role.create({
      role: 'teacher',
      status: 'active',
      userId: teacher.id,
      schoolId: school.id,
    })
    const classs = await Class.create({
      name: `Grade ${index}`,
      schoolId: school.id,
      teacherId: teacher.id,
    })
    classes.push(classs)
  }
  return classes
}

export default class extends BaseSeeder {
  async run() {
    await createAdminUsers()
    const schools = await SchoolFactory.createMany(3)
    for (const school of schools) {
      const teachers = await createStaffs(school)
      const classses = await attachRoleToTeachers(school, teachers)
      const students = await createStudentsForClasses(school, classses)
      await createAttendanceForStudents(students)
    }
  }
}
