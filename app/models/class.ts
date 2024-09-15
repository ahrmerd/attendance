import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import School from '#models/school'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import User from '#models/user'


export default class Class extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare schoolId: number

  @column()
  declare name: string

  @column()
  declare status: 'active' | 'inactive'


  @column()
  declare teacherId: number
  
  @belongsTo(()=> School)
  declare school: BelongsTo<typeof School>

  @belongsTo(()=> User,{
    foreignKey: 'teacherId',
  })
  declare teacher: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
