import Attendance from '#models/attendance';
export default class AttendancesController {
    async index({ inertia, request, params }) {
        const classId = params.id;
        const page = request.input('page', 1);
        const search = request.input('search');
        let query = Attendance.query()
            .where('class_id', classId)
            .orderBy('clock_in', 'desc')
            .preload('student')
            .preload('class');
        if (search) {
            query = query.whereHas('student', (studentQuery) => {
                studentQuery
                    .where('first_name', 'like', `%${search}%`)
                    .orWhere('last_name', 'like', `%${search}%`);
            });
        }
        const attendances = await query.paginate(page, 10);
        return inertia.render('myschools/school_attendance_index', {
            attendances,
            classId: classId,
        });
    }
}
//# sourceMappingURL=attendances_controller.js.map