import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('school_id').unsigned().references('id').inTable('schools').onDelete('CASCADE')
      table.integer('class_id').unsigned().references('id').inTable('classes').onDelete('SET NULL')
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.date('date_of_birth').notNullable()
      table.string('primary_contact', 20).notNullable()

      table.enum('status', ['active', 'inactive']).defaultTo('active')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
