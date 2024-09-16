import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Class from '#models/class'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import School from '#models/school'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare schoolId: number

  @column()
  declare studentId: number

  @column()
  declare classId: number

  @column()
  declare firstName: string

  @column()
  declare primaryContact: string

  @column()
  declare lastName: string

  @column()
  declare dateOfBirth: Date | undefined

  @column()
  declare status: 'active' | 'inactive'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Class)
  declare class: BelongsTo<typeof Class>

  @belongsTo(() => School)
  declare school: BelongsTo<typeof School>
}
