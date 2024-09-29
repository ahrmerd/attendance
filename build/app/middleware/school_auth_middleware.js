export default class SchoolAuthMiddleware {
    redirectTo = '/login';
    async handle(ctx, next, options = {}) {
        const user = await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo });
        const role = await user.related('role').query().first();
        if (!role || role.role !== 'admin') {
            return ctx.response.redirect().toRoute('notSchool');
        }
        return next();
    }
}
//# sourceMappingURL=school_auth_middleware.js.map