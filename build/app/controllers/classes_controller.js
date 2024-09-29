import Class from '#models/class';
import Role from '#models/role';
import School from '#models/school';
import { editClassValidator, registerClassValidator } from '#validators/class_validator';
export default class ClassesController {
    async index({ inertia, request, auth }) {
        const roles = await auth.user?.related('role').query().exec();
        const page = request.input('page', 1);
        const search = request.input('search');
        let classQuery = Class.query().preload('school').preload('teacher');
        if (search) {
            classQuery = classQuery
                .orWhereHas('school', (schoolQuery) => {
                schoolQuery.orWhere('name', 'like', `%${search}%`);
            })
                .orWhere('name', 'like', `%${search}%`)
                .orWhere('teacherId', 'like', `%${search}%`)
                .orWhere('schoolId', 'like', `%${search}%`);
        }
        const schoolsId = roles?.map((role) => role.schoolId) ?? [];
        const schoolTeachers = await Role.query().whereIn('school_id', schoolsId).preload('user').exec();
        classQuery = classQuery.whereIn('school_id', schoolsId);
        const classes = await classQuery.paginate(page, 10);
        const schools = await School.query().whereIn('id', schoolsId);
        return inertia.render('myschools/class_index', {
            classes,
            schools,
            schoolTeachers,
        });
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(registerClassValidator);
        await Class.create(payload);
        return response.redirect().back();
    }
    async update({ params, request, response }) {
        const classs = await Class.findOrFail(params.id);
        const payload = await request.validateUsing(editClassValidator);
        classs.merge(payload);
        await classs.save();
        return response.redirect().back();
    }
    async destroy({ params, response }) {
        const classes = await Class.findOrFail(params.id);
        await classes.delete();
        return response.redirect().back();
    }
}
//# sourceMappingURL=classes_controller.js.map