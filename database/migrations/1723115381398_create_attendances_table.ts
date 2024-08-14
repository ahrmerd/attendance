import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attendances'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('student_id')
        .unsigned()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')
      table.integer('class_id').unsigned().references('id').inTable('classes').onDelete('SET NULL')
      // table.date('date').notNullable();
      table.timestamp('clock_in', { useTz: true })
      table.timestamp('clock_out', { useTz: true })

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
