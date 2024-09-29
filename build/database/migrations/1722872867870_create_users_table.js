import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'users';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table.string('full_name').notNullable();
            table.string('email', 254).notNullable().unique();
            table.string('phone', 20).nullable();
            table.string('password').notNullable();
            table.boolean('is_system_admin').defaultTo(false);
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1722872867870_create_users_table.js.map