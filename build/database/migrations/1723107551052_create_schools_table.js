import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'schools';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name').notNullable();
            table.string('address').notNullable();
            table.string('phone', 20).notNullable();
            table.string('email', 255);
            table.enum('status', ['active', 'inactive']).defaultTo('active');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1723107551052_create_schools_table.js.map