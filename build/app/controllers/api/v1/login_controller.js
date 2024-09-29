import User from '#models/user';
import { loginUserValidator } from '#validators/user_validator';
import { errors as authErrors } from '@adonisjs/auth';
export default class LoginController {
    async login(ctx) {
        const payload = await ctx.request.validateUsing(loginUserValidator);
        try {
            const user = await User.verifyCredentials(payload.email, payload.password);
            const oldTokens = await User.accessTokens.all(user);
            for (const oldToken of oldTokens) {
                await User.accessTokens.delete(user, oldToken.identifier);
            }
            const token = await User.accessTokens.create(user);
            return { user, token };
        }
        catch (error) {
            if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
                ctx.session.flash('errors', { email: 'invalid creds' });
                return ctx.response.status(error.status).send(error);
            }
            return ctx.response.send(error);
        }
    }
}
//# sourceMappingURL=login_controller.js.map