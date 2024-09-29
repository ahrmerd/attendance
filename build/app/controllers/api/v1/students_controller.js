import Class from '#models/class';
import Student from '#models/student';
import { storeStudentValidator, verifyStudentValidator } from '#validators/student_validator';
export default class StudentsController {
    async index({ request, auth }) {
        const user = await auth.authenticateUsing(['api']);
        if (user) {
            const roles = await user.related('role').query().exec();
            const adminschoolsId = roles
                ?.filter((role) => role.role === 'admin')
                .map((role) => role.schoolId);
            const classes = await Class.query()
                .whereIn('school_id', adminschoolsId)
                .orWhere('teacher_id', user.id)
                .exec();
            const classesIds = classes.map((sclass) => sclass.id);
            const students = Student.query().whereIn('class_id', classesIds);
            return students;
        }
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(storeStudentValidator);
        const classs = await Class.find(payload.classId);
        if (classs !== null) {
            const student = await Student.create({
                classId: payload.classId,
                primaryContact: payload.primaryContact,
                firstName: payload.firstName,
                lastName: payload.firstName,
                finger1: Buffer.from(payload.finger1, 'base64'),
                finger2: Buffer.from(payload.finger2, 'base64'),
                schoolId: classs?.schoolId,
            });
            return student;
        }
        return response
            .status(422)
            .send({ errors: [{ message: 'could not add students. The Class could not be found' }] });
    }
    async verifyStudents({ request, response }) {
        const payload = await request.validateUsing(verifyStudentValidator);
        const buf = Buffer.from(payload.finger, 'base64');
        const students = await Student.query().where('finger1', buf).orWhere('finger2', buf).exec();
        if (students.length > 0) {
            return students[0];
        }
        return response.status(422).send({ errors: [{ message: 'No Student Found' }] });
    }
    async update({ request }) {
    }
    async sync(ctx) {
        return this.index(ctx);
    }
}
//# sourceMappingURL=students_controller.js.map