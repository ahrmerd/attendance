import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Class from '#models/class'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Student from '#models/student'

export default class Attendance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare studentId: number

  @column()
  declare classId: number

  @column.dateTime()
  declare clockIn: DateTime

  @column.dateTime()
  declare clockOut: DateTime

  @belongsTo(() => Class, {
    foreignKey: 'classId',
  })
  declare class: BelongsTo<typeof Class>

  @belongsTo(() => Student, {
    foreignKey: 'studentId',
  })
  declare student: BelongsTo<typeof Student>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
