import type { HttpContext } from '@adonisjs/core/http'
import User from 'app/models/user.js'

export default class TeachersController {
    async index({ inertia, request, auth, response }: HttpContext) {
        const roles = await auth.user?.related('role').query().exec()
        const page = request.input('page', 1)
        const search = request.input('search')
        if (!roles || roles.length == 0) {
            return response.redirect().toRoute('notSchool')
        }
        const schoolsId = roles.map(role => role.schoolId);
        let teachersQuery = User.query().preload('role', (roleQuery)=>{
            roleQuery.where('role', 'teacher')
        }).whereIn('school_id', schoolsId)
        
        if (search) {
            teachersQuery = teachersQuery
                .where('full_name', 'like', `%${search}%`)
                .orWhere('email', 'like', `%${search}%`)
                .orWhere('phone', 'like', `%${search}%`)
        }
        const teachers = await teachersQuery.paginate(page)
        return inertia.render('myschools/', {
            teachers
        })
    }
}