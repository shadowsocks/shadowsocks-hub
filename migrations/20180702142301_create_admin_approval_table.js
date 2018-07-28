
exports.up = function (knex, Promise) {
    return knex.schema.createTable('admin_approval', function (table) {
        table.uuid('id').notNullable();
        table.string('type').notNullable();
        table.primary(['id', 'type']);
        table.foreign(['id', 'type']).references(['id', 'type']).on('payment');
        table.index('id');
        table.index('type');
        table.index(['id', 'type']);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('admin_approval');
};
