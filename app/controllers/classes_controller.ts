// import type { HttpContext } from '@adonisjs/core/http'
import Class from '#models/class'
import Role from '#models/role'
import School from '#models/school'
import { editClassValidator, registerClassValidator } from '#validators/class_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClassesController {
  async index({ inertia, request, auth }: HttpContext) {
    const roles: Role[] = await auth.user?.related('role').query().exec()

    const page = request.input('page', 1)
    const search = request.input('search')
    let classQuery = Class.query().preload('school').preload('teacher')
    if (search) {
      classQuery = classQuery
        .orWhereHas('school', (schoolQuery)=>{
          schoolQuery.orWhere('name', 'like', `%${search}%`)
        })
        
        .orWhere('name', 'like', `%${search}%`)
        .orWhere('teacherId', 'like', `%${search}%`)
        .orWhere('schoolId', 'like', `%${search}%`)
    }
    const schoolsId = roles?.map((role) => role.schoolId) ?? []
    const schoolTeachers = await Role.query().whereIn('school_id', schoolsId).preload('user').exec()
    // const users = (await users_schools).map((role)=>role.user);
    // const usersId = roles?.map(role => role.userId)??[];
    classQuery = classQuery.whereIn('school_id', schoolsId)
    // console.log(await classQuery.exec())
    const classes = await classQuery.paginate(page, 10) //why am i gettin all classes. fixed and not sure
    const schools = await School.query().whereIn('id', schoolsId)
    // const users = await User.query().whereIn('id', usersId)
    return inertia.render('myschools/class_index', {
      classes,
      schools,
      schoolTeachers,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerClassValidator)
    // payload.password = await hash.make(payload.password)
    await Class.create(payload)
    return response.redirect().back()
  }

  async update({ params, request, response }: HttpContext) {
    const classs = await Class.findOrFail(params.id)
    const payload = await request.validateUsing(editClassValidator)
    // console.log(payload);
    // return;
    classs.merge(payload)
    await classs.save()
    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const classes = await Class.findOrFail(params.id)
    await classes.delete()
    return response.redirect().back()
  }
}
