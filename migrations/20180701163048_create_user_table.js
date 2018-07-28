
exports.up = function (knex, Promise) {
    return knex.schema.createTable('user', function (table) {
        table.uuid('id').primary();
        table.string('type').notNullable();
        table.string('role').notNullable();
        table.string('email');
        table.string('telegram');
        table.bigInteger('createdTime').notNullable();
        table.unique(['id', 'type']); // for composite foreign key by other tables
        table.unique('email');
        table.unique('telegram');
        table.index('id');
        table.index('type');
        table.index('role');
        table.index('email');
        table.index('telegram');
        table.index('createdTime');
        table.index(['id', 'type']);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('user');
};
