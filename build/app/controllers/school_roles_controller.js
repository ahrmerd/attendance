import School from '#models/school';
import Role from '#models/role';
import { addRoleValidator, editRoleValidator } from '#validators/roles_validator';
export default class RolesController {
    async index({ inertia, request, auth }) {
        const authUserRoles = await auth.user?.related('role').query().exec();
        const schoolsId = authUserRoles?.map((role) => role.schoolId) ?? [];
        let query = Role.query();
        query = query.preload('user').preload('school');
        query.whereIn('school_id', schoolsId);
        console.log(query.toQuery());
        const schools = await School.query().whereIn('id', schoolsId);
        const users = await School.query().whereIn('id', schoolsId);
        const roles = await query.exec();
        return inertia.render('myschools/staffs_index', {
            roles,
            schools,
        });
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(addRoleValidator);
        const searchPayload = { schoolId: payload.schoolId, userId: payload.userId };
        const persistancePayload = { role: payload.role };
        await Role.updateOrCreate(searchPayload, persistancePayload);
        return response.redirect().back();
    }
    async update({ params, request, response }) {
        const role = await Role.findOrFail(params.id);
        const payload = await request.validateUsing(editRoleValidator);
        role.role = payload.role;
        await role.save();
        return response.redirect().back();
    }
    async destroy({ params, response }) {
        const role = await Role.findOrFail(params.id);
        await role.delete();
        return response.redirect().back();
    }
}
//# sourceMappingURL=school_roles_controller.js.map