import factory from '@adonisjs/lucid/factories'
import School from '#models/school'

export const SchoolFactory = factory
  .define(School, async ({ faker }) => {
    return {}
  })
  .build()
