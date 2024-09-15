import type { HttpContext } from '@adonisjs/core/http'
import Class from '#models/class';

export default class AttendancesController {
    async index({ inertia, request, auth, params }: HttpContext) {
        const id = params.id;
        const authUserRoles = await auth.user?.related('role').query().exec()
        const schoolsId = authUserRoles?.map(role => role.schoolId) ?? [];
        const classes = await Class.findOrFail();
       
        
        const page = request.input('page', 1)
        const search = request.input('search')
        let classQuery = Class.query().preload('school')
          .preload('teacher')
        if (search) {
          classQuery = classQuery
            .where('name', 'like', `%${search}%`)
            .orWhere('teacherId', 'like', `%${search}%`)
            .orWhere('schoolId', 'like', `%${search}%`)
        }
        const schoolsId = roles?.map(role => role.schoolId) ?? [];
        const schoolTeachers = (await Role.query()
          .whereIn('school_id', schoolsId)
          .preload('user').exec())
        // const users = (await users_schools).map((role)=>role.user);
        // const usersId = roles?.map(role => role.userId)??[];
        const classes = await classQuery.paginate(page, 10)
        const schools = await School.query().whereIn('id', schoolsId)
        // const users = await User.query().whereIn('id', usersId)
        return inertia.render('myschools/class_index', {
          classes,
          schools,
          schoolTeachers
        })
      }
}
