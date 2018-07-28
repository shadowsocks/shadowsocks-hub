exports.up = function (knex, Promise) {
    return knex.schema.createTable('traffic', function (table) {
        table.uuid('id').primary();
        table.uuid('accountId').notNullable();
        table.bigInteger('usage').notNullable();
        table.bigInteger('lastMeterReading').notNullable();
        table.bigInteger('createdTime').notNullable();
        table.foreign('accountId').references('id').on('account');
        table.index('id');
        table.index('accountId');
        table.index('usage');
        table.index('lastMeterReading');
        table.index('createdTime');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('traffic');
};
