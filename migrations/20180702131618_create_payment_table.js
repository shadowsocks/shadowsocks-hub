
exports.up = function (knex, Promise) {
    return knex.schema.createTable('payment', function (table) {
        table.uuid('id').primary();
        table.string('type').notNullable();
        table.string('currency').notNullable();
        table.integer('amount').notNullable();
        table.string('state').notNullable();
        table.bigInteger('createdTime').notNullable();
        table.unique(['id', 'type']); // for composite foreign key by other tables
        table.index('id');
        table.index('type');
        table.index('currency');
        table.index('amount');
        table.index('state');
        table.index('createdTime');
        table.index(['id', 'type']);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('payment');
};
