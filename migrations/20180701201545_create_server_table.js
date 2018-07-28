
exports.up = function (knex, Promise) {
    return knex.schema.createTable('server', function (table) {
        table.uuid('id').primary();
        table.string('ipAddressOrDomainName').notNullable().unique();
        table.bigInteger('createdTime').notNullable();
        table.index('id');
        table.index('ipAddressOrDomainName');
        table.index('createdTime');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('server');
};
