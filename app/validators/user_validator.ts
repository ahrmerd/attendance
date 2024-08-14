import vine from '@vinejs/vine'
export const registerUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(4).maxLength(256),
    email: vine
      .string()
      .trim()
      .minLength(4)
      .maxLength(256)
      .email()
      .unique(async (db, value, _field) => {
        const user = await db
          .from('users')
          // .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()
        return !user
      }),
    password: vine.string().trim().minLength(4).maxLength(256).confirmed(),
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
