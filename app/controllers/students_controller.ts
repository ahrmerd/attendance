import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'

export default class StudentsController {
    async index({ inertia, request, auth, response }: HttpContext) {
        const roles = await auth.user?.related('role').query().exec()
        const page = request.input('page', 1)
        const search = request.input('search')
        // if (!roles || roles.length == 0) {
        
        //     return response.redirect().toRoute('notSchool')
        //     // return
        // }
        const schoolsId = roles?.map(role => role.schoolId)??[];
        let studentsQuery = Student.query().whereIn('school_id', schoolsId);
        studentsQuery.preload('class').preload('school')
        if (search) {
            studentsQuery = studentsQuery
                .where('first_name', 'like', `%${search}%`)
                .orWhere('last_name', 'like', `%${search}%`)
                .orWhere('primary_contact', 'like', `%${search}%`)
        }
        const students = await studentsQuery.paginate(page)
        
        return inertia.render('students/students_index', {
            students: students,
        })
    }
}
