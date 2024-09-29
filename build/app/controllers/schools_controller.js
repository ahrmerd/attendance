import Role from '#models/role';
import School from '#models/school';
import User from '#models/user';
import { addSchoolValidator, editSchoolValidator } from '#validators/school_validator';
import db from '@adonisjs/lucid/services/db';
export default class SchoolsController {
    async index({ inertia }) {
        return inertia.render('schools/schools_index', {
            schools: await School.all(),
        });
    }
    async search({ request }) {
        const search = request.input('q');
        let schoolQuery = School.query();
        if (search) {
            schoolQuery = schoolQuery
                .where('name', 'like', `%${search}%`)
                .orWhere('email', 'like', `%${search}%`)
                .orWhere('phone', 'like', `%${search}%`)
                .orWhere('address', 'like', `%${search}%`);
        }
        const school = await schoolQuery.exec();
        return school;
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(addSchoolValidator);
        await db.transaction(async (trx) => {
            const school = await School.create({
                name: payload.name,
                address: payload.address,
                phone: payload.phone,
                email: payload.email,
                status: payload.status,
            }, { client: trx });
            const user = await User.create({
                fullName: payload.name,
                phone: payload.phone,
                email: payload.email,
                password: payload.password,
            }, { client: trx });
            await Role.create({
                schoolId: school.id,
                userId: user.id,
                role: 'admin',
            }, { client: trx });
        });
        return response.redirect().back();
    }
    async update({ params, request, response }) {
        const school = await School.findOrFail(params.id);
        const payload = await request.validateUsing(editSchoolValidator);
        school.merge(payload);
        await school.save();
        return response.redirect().back();
    }
    async destroy({ params, response }) {
        const school = await School.findOrFail(params.id);
        await school.delete();
        return response.redirect().back();
    }
}
//# sourceMappingURL=schools_controller.js.map