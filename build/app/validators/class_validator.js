import vine from '@vinejs/vine';
export const registerClassValidator = vine.compile(vine.object({
    schoolId: vine.number(),
    name: vine.string().trim().minLength(4),
    teacherId: vine.number(),
}));
export const editClassValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(4),
    teacherId: vine.number(),
}));
//# sourceMappingURL=class_validator.js.map