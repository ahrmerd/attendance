import Role from '#models/role';
import { addRoleValidator, editRoleValidator } from '#validators/roles_validator';
export default class RolesController {
    async index({ inertia, request }) {
        const page = request.input('page', 1);
        const search = request.input('search');
        let query = Role.query();
        query = query.preload('user').preload('school');
        if (search) {
            console.log(search);
            query
                .orWhereHas('user', (userQuery) => {
                userQuery
                    .where('full_name', 'like', `%${search}%`)
                    .orWhere('email', 'like', `%${search}%`);
            })
                .orWhereHas('school', (schoolQuery) => {
                schoolQuery
                    .where('name', 'like', `%${search}%`)
                    .orWhere('email', 'like', `%${search}%`)
                    .orWhere('phone', 'like', `%${search}%`)
                    .orWhere('address', 'like', `%${search}%`);
            })
                .orWhere('role', 'like', `%${search}%`);
        }
        const roles = await query.paginate(page);
        return inertia.render('roles/roles_index', {
            roles,
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
//# sourceMappingURL=roles_controller.js.map