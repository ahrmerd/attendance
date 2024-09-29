import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Class from '#models/class'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import School from '#models/school'
import Attendance from './attendance.js'

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
  declare status: 'active' | 'inactive'

  @column({
    serialize: (value: Buffer) => {
      return value.toString('base64')
    },
  })
  declare finger1: Buffer

  @column({
    serialize: (value: Buffer) => {
      return value.toString('base64')
    },
  })
  declare finger2: Buffer

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Class)
  declare class: BelongsTo<typeof Class>

  @hasMany(() => Attendance)
  declare attendance: HasMany<typeof Attendance>

  @belongsTo(() => School)
  declare school: BelongsTo<typeof School>
}
