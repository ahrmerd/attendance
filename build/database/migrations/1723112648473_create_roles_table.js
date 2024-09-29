import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'roles';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.enum('role', ['admin', 'teacher']);
            table.integer('school_id').unsigned().references('id').inTable('schools').onDelete('CASCADE');
            table.enum('status', ['active', 'inactive']).defaultTo('active');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1723112648473_create_roles_table.js.map