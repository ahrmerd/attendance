import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Role from '#models/role'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Class from '#models/class'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { AccessToken } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(User)

  // currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column()
  declare phone: string | null

  @column()
  declare isSystemAdmin: boolean

  @column({ serializeAs: null })
  declare password: string

  @hasMany(() => Class)
  declare class: HasMany<typeof Class>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasOne(() => Role)
  declare role: HasOne<typeof Role>
}
