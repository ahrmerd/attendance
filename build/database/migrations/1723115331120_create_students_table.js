import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'students';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('school_id').unsigned().references('id').inTable('schools').onDelete('CASCADE');
            table.integer('class_id').unsigned().references('id').inTable('classes').onDelete('SET NULL');
            table.string('first_name', 50).notNullable();
            table.string('last_name', 50).notNullable();
            table.binary('finger_1').notNullable();
            table.binary('finger_2').notNullable();
            table.string('primary_contact', 20).notNullable();
            table.enum('status', ['active', 'inactive']).defaultTo('active');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1723115331120_create_students_table.js.map