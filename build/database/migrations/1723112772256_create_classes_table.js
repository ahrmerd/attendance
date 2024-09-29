import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'classes';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.enum('status', ['active', 'inactive']).defaultTo('active');
            table.integer('school_id').unsigned().references('id').inTable('schools').onDelete('CASCADE');
            table.string('name', 50).notNullable();
            table
                .integer('teacher_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL')
                .nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1723112772256_create_classes_table.js.map