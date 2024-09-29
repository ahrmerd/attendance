export default class AdminAuthMiddleware {
    redirectTo = '/login';
    async handle(ctx, next, options = {}) {
        const user = await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo });
        if (!user.isSystemAdmin) {
            return ctx.response.redirect().toRoute('notAdmin');
        }
        return next();
    }
}
//# sourceMappingURL=admin_auth_middleware.js.map