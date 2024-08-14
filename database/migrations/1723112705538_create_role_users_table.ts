import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('role', ['admin', 'teacher'])
      // table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
      table.integer('school_id').unsigned().references('id').inTable('schools').onDelete('CASCADE')
      // table.primary(['user_id', 'school_id'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
