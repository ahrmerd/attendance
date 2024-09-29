import Class from '#models/class';
export default class ClassesController {
    async index({ request, auth }) {
        const user = await auth.user;
        if (user) {
            const roles = await user.related('role').query().exec();
            const adminschoolsId = roles
                ?.filter((role) => role.role === 'admin')
                .map((role) => role.schoolId);
            const classes = await Class.query()
                .preload('school')
                .whereIn('school_id', adminschoolsId)
                .orWhere('teacher_id', user.id)
                .exec();
            return classes;
        }
    }
}
//# sourceMappingURL=classes_controller.js.map