import factory from '@adonisjs/lucid/factories'
import Student from '#models/student'

export const StudentFactory = factory
  .define(Student, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      finger1: Buffer.from('test'),
      finger2: Buffer.from('test2'),
      primaryContact: faker.phone.number(),
    }
  })
  .build()
