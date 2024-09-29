import User from '#models/user';
import Class from '#models/class';
import Student from '#models/student';
import Attendance from '#models/attendance';
import School from '#models/school';
export default class DownloadsController {
    async index({ request, auth }) {
        const user = await auth.user;
        if (user) {
            const roles = await user.related('role').query().exec();
            const schoolsId = roles?.map((role) => role.schoolId) ?? [];
            const adminschoolsId = roles
                ?.filter((role) => role.role === 'admin')
                .map((role) => role.schoolId);
            const schools = await School.query().whereIn('id', schoolsId).exec();
            const classes = await Class.query()
                .whereIn('school_id', adminschoolsId)
                .orWhere('teacher_id', user.id)
                .exec();
            const classesXteachersIds = classes.map((sclass) => {
                return { classId: sclass.id, teacher: sclass.teacherId };
            });
            const students = await Student.query().whereIn('class_id', classesXteachersIds.map((e) => e.classId));
            const studentsIds = students.map((student) => student.id);
            const teachers = await User.query().whereIn('id', classesXteachersIds.map((e) => e.teacher));
            const attendances = await Attendance.query().whereIn('student_id', studentsIds);
            return {
                teachers,
                user,
                schools,
                classes,
                students,
                attendances,
            };
        }
    }
}
//# sourceMappingURL=downloads_controller.js.map