import Class from '#models/class';
import Role from '#models/role';
import School from '#models/school';
import Student from '#models/student';
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';

export default class DashboardController {
    async index({ inertia }: HttpContext) {
        const school = (await School.query()).length;
        const users = (await User.query()).length;
        const roles = (await Role.query()).length;
        return inertia.render('admin/dashboard', {
            version: 6,
            school: school,
            users: users,
            roles: roles
        })
    }

    async schoolDashboard({ inertia, auth }: HttpContext) {
        const role: Role[] = await auth.user?.related('role').query().exec();
        const schoolsId = role?.map((role) => role.schoolId) ?? []
        const classes = await Class.query().whereIn('schoolId', schoolsId);
        const students = await Student.query().whereIn('schoolId', schoolsId);
        const staff = await Role.query().whereIn('schoolId', schoolsId);

        return inertia.render('myschools/my_school_dashboard', {
            classes: classes,
            students: students,
            staff: staff,
        })
    }
}