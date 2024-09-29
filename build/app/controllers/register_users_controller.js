import User from '#models/user';
import { registerUserValidator } from '#validators/user_validator';
export default class RegisterUsersController {
    async create({ inertia }) {
        return inertia.render('register');
    }
    async register({ response, request, auth }) {
        const payload = await request.validateUsing(registerUserValidator);
        const user = await User.create(payload);
        await auth.use('web').login(user);
        return response.redirect().toRoute('dashboard');
    }
}
//# sourceMappingURL=register_users_controller.js.map