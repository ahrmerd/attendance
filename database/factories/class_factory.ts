import factory from '@adonisjs/lucid/factories'
import Class from '#models/class'

export const ClassFactory = factory
  .define(Class, async ({ faker }) => {
    return {
      name: faker.helpers.arrayElement(['primary 1', 'primary 1']),
    }
  })
  .build()
