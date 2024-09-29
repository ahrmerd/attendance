export default class GuestMiddleware {
    redirectTo = '/dashboard';
    redirectToSchool = '/myschools';
    async handle(ctx, next, options = {}) {
        for (let guard of options.guards || [ctx.auth.defaultGuard]) {
            if (await ctx.auth.use(guard).check()) {
                const { isSystemAdmin } = await ctx.auth.authenticateUsing([guard]);
                console.log(ctx.auth.user);
                if (isSystemAdmin) {
                    return ctx.response.redirect(this.redirectTo, true);
                }
                return ctx.response.redirect().toRoute('myschools');
            }
        }
        return next();
    }
}
//# sourceMappingURL=guest_middleware.js.map