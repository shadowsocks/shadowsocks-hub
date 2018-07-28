exports.up = function (knex, Promise) {
    return knex.schema.createTable('account', function (table) {
        table.uuid('id').primary();
        table.string('type').notNullable();
        table.string('nodeId').notNullable();
        table.string('purchaseId').notNullable();
        table.integer('port').notNullable();
        table.bigInteger('createdTime').notNullable();
        table.foreign('nodeId').references('id').on('node');
        table.foreign('purchaseId').references('id').on('purchase');
        table.unique(['id', 'type']); // for composite foreign key by other tables
        table.index('id');
        table.index('type');
        table.index('nodeId');
        table.index('purchaseId');
        table.index('port');
        table.index('createdTime');
        table.index(['id', 'type']);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('account');
};
