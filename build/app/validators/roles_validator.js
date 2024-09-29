import vine from '@vinejs/vine';
export const addRoleValidator = vine.compile(vine.object({
    userId: vine
        .number()
        .exists(async (db, value, _field) => {
        const user = await db.from('users').where('id', value).first();
        return user;
    }),
    role: vine.enum(['admin', 'teacher']),
    schoolId: vine
        .number()
        .exists(async (db, value, _field) => {
        const user = await db.from('schools').where('id', value).first();
        return user;
    }),
}));
export const editRoleValidator = vine.compile(vine.object({
    role: vine.enum(['admin', 'teacher']),
}));
//# sourceMappingURL=roles_validator.js.map