import factory from '@adonisjs/lucid/factories'
import Class from '#models/class'

export const ClassFactory = factory
  .define(Class, async ({ faker }) => {
    return {}
  })
  .build()
