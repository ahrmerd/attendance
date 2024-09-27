import Class from '#models/class'
import Student from '#models/student'
import { editStudentValidator } from '#validators/student_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  async index({ inertia, request, auth, response }: HttpContext) {
    const roles = await auth.user?.related('role').query().exec()
    const page = request.input('page', 1)
    const search = request.input('search')
    // if (!roles || roles.length == 0) {

    //     return response.redirect().toRoute('notSchool')
    //     // return
    // }
    const schoolsId = roles?.map((role) => role.schoolId) ?? []
    let studentsQuery = Student.query().whereIn('school_id', schoolsId)
    studentsQuery.preload('class').preload('school')
    if (search) {
      studentsQuery = studentsQuery
        .where('first_name', 'like', `%${search}%`)
        .orWhere('last_name', 'like', `%${search}%`)
        .orWhere('primary_contact', 'like', `%${search}%`)
        .orWhereHas('school', (schoolQuery) => {
          schoolQuery.where('name', 'like', `%${search}%`)
        })
        .orWhereHas('class', (classQuery) => {
          classQuery.where('name', 'like', `%${search}%`)
        })
    }
    const students = await studentsQuery.paginate(page)
    let classes = await Class.query().whereIn('school_id', schoolsId).exec()
    // let schools = await School.query().whereIn('id', schoolsId).exec();
    return inertia.render('students/students_index', {
      students,
      classes,
      // schools,
    })
  }

  async classStudents({ inertia, request, params, auth }: HttpContext) {
    // const student =await Student.create({
    //     id:23,
    //     schoolId:1,
    //     classId:1,
    //     firstName:'Sadam',
    //     lastName:'sediq',
    //     finger1: Buffer.alloc(32),
    //     finger2:Buffer.alloc(32),
    //     status: 'active',
    //     primaryContact: '0702276252',
    //     // studentId:1
    // })
    const classId = params.id
    const page = request.input('page', 1)
    const search = request.input('search')

    const roles = await auth.user?.related('role').query().exec()
    const schoolsId = roles?.map((role) => role.schoolId) ?? []

    let classes = await Class.query()
      // .preload('school')
      // .preload('teacher')
      .whereIn('school_id', schoolsId)
      .exec()

    const classDetails = await Class.query()
      .where('id', classId)
      .whereIn('school_id', schoolsId)
      .firstOrFail()

    //console.log(classDetails);
    let studentsQuery = Student.query()
      // .where('class_id', classId)
      .preload('school')
      .preload('class')

    // console.log(await Student.all());

    if (search) {
      studentsQuery = studentsQuery.where((query) => {
        query
          .where('first_name', 'like', `%${search}%`)
          .orWhere('last_name', 'like', `%${search}%`)
          .orWhere('primary_contact', 'like', `%${search}%`)
      })
    }

    const students = await studentsQuery.paginate(page, 10)

    return inertia.render('myschools/class_students_index', {
      students: students,
      class: classDetails,
      classes: classes,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    const payload = await request.validateUsing(editStudentValidator)
    student.merge(payload)
    await student.save()
    return response.redirect().back()
  }
}
