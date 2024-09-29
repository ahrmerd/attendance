import vine from '@vinejs/vine';
export const editStudentValidator = vine.compile(vine.object({
    firstName: vine.string().trim().minLength(4).maxLength(256),
    lastName: vine.string().trim().minLength(4).maxLength(256),
    primaryContact: vine.string().trim().minLength(4).maxLength(256),
    classId: vine.number().exists(async (db, value, _field) => {
        const classRecord = await db.from('classes').where('id', value).first();
        return classRecord;
    }),
    schoolId: vine.number().exists(async (db, value, _field) => {
        const school = await db.from('schools').where('id', value).first();
        return school;
    }),
    status: vine.enum(['active', 'inactive']),
}));
export const storeStudentValidator = vine.compile(vine.object({
    firstName: vine.string().trim().maxLength(256),
    lastName: vine.string().trim().maxLength(256),
    finger1: vine.string(),
    finger2: vine.string(),
    primaryContact: vine.string().trim().maxLength(256),
    classId: vine.number().exists(async (db, value, _field) => {
        const cl = await db.from('classes').where('id', value).first();
        return cl;
    }),
}));
export const verifyStudentValidator = vine.compile(vine.object({
    finger: vine.string(),
}));
//# sourceMappingURL=student_validator.js.map