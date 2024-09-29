import User from '#models/user';
import { changePasswordValidator, editUserValidator, registerUserValidator, } from '#validators/user_validator';
export default class UsersController {
    async index({ inertia, request }) {
        const page = request.input('page', 1);
        const search = request.input('search');
        let usersQuery = User.query();
        if (search) {
            usersQuery = usersQuery
                .where('full_name', 'like', `%${search}%`)
                .orWhere('email', 'like', `%${search}%`)
                .orWhere('phone', 'like', `%${search}%`);
        }
        const users = await usersQuery.paginate(page, 10);
        return inertia.render('users/users_index', {
            users,
        });
    }
    async search({ request }) {
        const search = request.input('q');
        let usersQuery = User.query();
        if (search) {
            usersQuery = usersQuery
                .where('full_name', 'like', `%${search}%`)
                .orWhere('email', 'like', `%${search}%`)
                .orWhere('phone', 'like', `%${search}%`);
        }
        const users = await usersQuery.exec();
        return users;
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(registerUserValidator);
        await User.create(payload);
        return response.redirect().back();
    }
    async update({ params, request, response }) {
        const user = await User.findOrFail(params.id);
        const payload = await request.validateUsing(editUserValidator);
        user.merge(payload);
        await user.save();
        return response.redirect().back();
    }
    async changePassword({ params, request, response }) {
        const user = await User.findOrFail(params.id);
        const payload = await request.validateUsing(changePasswordValidator);
        user.password = payload.password;
        await user.save();
        return response.redirect().back();
    }
    async destroy({ params, response }) {
        const user = await User.findOrFail(params.id);
        await user.delete();
        return response.redirect().back();
    }
}
//# sourceMappingURL=users_controller.js.map