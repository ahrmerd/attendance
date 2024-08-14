import vine from '@vinejs/vine'
export const addSchoolValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(255),
    address: vine.string().trim().minLength(4).maxLength(255),
    phone: vine.string().trim().minLength(4).maxLength(255),
    status: vine.enum(['active', 'inactive']),
    // status: vine.string().trim().minLength(4).maxLength(255).in(['active', 'inactive']),
    email: vine
      .string()
      .trim()
      .minLength(4)
      .maxLength(256)
      .email()
      .unique(async (db, value, field) => {
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

export const editSchoolValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(255),
    address: vine.string().trim().minLength(4).maxLength(255),
    phone: vine.string().trim().minLength(4).maxLength(255),
    // status: vine.string().trim().minLength(4).maxLength(255).in(['active', 'inactive']),
    status: vine.enum(['active', 'inactive']),
    email: vine.string().trim().minLength(4).maxLength(256).email(),
  })
)
