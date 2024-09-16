import vine from '@vinejs/vine'
export const storeStudentValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().maxLength(256),
    lastName: vine.string().trim().maxLength(256),
    primaryContact: vine.string().trim().maxLength(256),
    dateOfBirth: vine.date(), //should be nullable
    classId: vine.number().exists(async (db, value, _field) => {
      const cl = await db.from('classes').where('id', value).first()
      return cl
    }),
  })
)

export const editUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(4).maxLength(256),
    phone: vine.string().trim().minLength(4).maxLength(256).nullable(),
    isSystemAdmin: vine.boolean(),
  })
)

export const changePasswordValidator = vine.compile(
  vine.object({
    password: vine.string().trim().minLength(4).maxLength(256).confirmed(),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    // fullName: vine.string().trim().minLength(4).maxLength(256),
    email: vine.string().trim().minLength(4).maxLength(256).email(),
    password: vine.string().trim(),
  })
)

// vine.compile(registerUserSchema)
