import User from '#models/user';
import { loginUserValidator } from '#validators/user_validator';
import { errors as authErrors } from '@adonisjs/auth';
export default class LoginUsersController {
    async create({ inertia }) {
        return inertia.render('login');
    }
    async logout(ctx) {
        ctx.auth.use('web').logout();
        return ctx.response.redirect().toRoute('login');
    }
    async login({ inertia, request, auth, session, ...ctx }) {
        const payload = await request.validateUsing(loginUserValidator);
        try {
            const user = await User.verifyCredentials(payload.email, payload.password);
            await auth.use('web').login(user);
            if (user.isSystemAdmin) {
                return ctx.response.redirect().toRoute('dashboard');
            }
            return ctx.response.redirect().toRoute('myschools');
        }
        catch (error) {
            if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
                session.flash('errors', {
                    email: 'invalid credentials. Please check your credentials and try again',
                });
                return ctx.response.redirect().back();
            }
            throw error;
        }
    }
}
//# sourceMappingURL=login_users_controller.js.map