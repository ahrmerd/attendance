import Class from '#models/class';
import Student from '#models/student';
import { editStudentValidator } from '#validators/student_validator';
export default class StudentsController {
    async index({ inertia, request, auth, response }) {
        const roles = await auth.user?.related('role').query().exec();
        const page = request.input('page', 1);
        const search = request.input('search');
        const schoolsId = roles?.map((role) => role.schoolId) ?? [];
        let studentsQuery = Student.query().whereIn('school_id', schoolsId);
        studentsQuery.preload('class').preload('school');
        if (search) {
            studentsQuery = studentsQuery
                .where('first_name', 'like', `%${search}%`)
                .orWhere('last_name', 'like', `%${search}%`)
                .orWhere('primary_contact', 'like', `%${search}%`)
                .orWhereHas('school', (schoolQuery) => {
                schoolQuery.where('name', 'like', `%${search}%`);
            })
                .orWhereHas('class', (classQuery) => {
                classQuery.where('name', 'like', `%${search}%`);
            });
        }
        const students = await studentsQuery.paginate(page);
        let classes = await Class.query().whereIn('school_id', schoolsId).exec();
        return inertia.render('students/students_index', {
            students,
            classes,
        });
    }
    async classStudents({ inertia, request, params, auth }) {
        const classId = params.id;
        const page = request.input('page', 1);
        const search = request.input('search');
        const roles = await auth.user?.related('role').query().exec();
        const schoolsId = roles?.map((role) => role.schoolId) ?? [];
        let classes = await Class.query()
            .whereIn('school_id', schoolsId)
            .exec();
        const classDetails = await Class.query()
            .where('id', classId)
            .whereIn('school_id', schoolsId)
            .firstOrFail();
        let studentsQuery = Student.query()
            .preload('school')
            .preload('class');
        if (search) {
            studentsQuery = studentsQuery.where((query) => {
                query
                    .where('first_name', 'like', `%${search}%`)
                    .orWhere('last_name', 'like', `%${search}%`)
                    .orWhere('primary_contact', 'like', `%${search}%`);
            });
        }
        const students = await studentsQuery.paginate(page, 10);
        return inertia.render('myschools/class_students_index', {
            students: students,
            class: classDetails,
            classes: classes,
        });
    }
    async update({ params, request, response }) {
        const student = await Student.findOrFail(params.id);
        const payload = await request.validateUsing(editStudentValidator);
        student.merge(payload);
        await student.save();
        return response.redirect().back();
    }
}
//# sourceMappingURL=students_controller.js.map