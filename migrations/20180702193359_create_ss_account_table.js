
exports.up = function (knex, Promise) {
    return knex.schema.createTable('ss_account', function (table) {
        table.uuid('id').notNullable();
        table.string('type').notNullable();
        table.string('password').notNullable();
        table.string('method').notNullable();
        table.primary(['id', 'type']);
        table.foreign(['id', 'type']).references(['id', 'type']).on('account');
        table.index('id');
        table.index('type');
        table.index('password');
        table.index('method');
        table.index(['id', 'type']);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('ss_account');
};
