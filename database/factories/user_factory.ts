import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      // username: faker.internet.userName(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      password: 'password',
      isSystemAdmin: faker.datatype.boolean(),
    }
  })
  .build()
