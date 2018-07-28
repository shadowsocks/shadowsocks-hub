
exports.up = function (knex, Promise) {
    return knex.schema.createTable('node', function (table) {
        table.uuid('id').primary();
        table.uuid('serverId').notNullable();
        table.string('protocol').notNullable();
        table.integer('port').notNullable();
        table.string('password').notNullable();
        table.string('name').notNullable().unique();
        table.string('comment');
        table.bigInteger('createdTime').notNullable();
        table.foreign('serverId').references('id').on('server');
        table.index('id');
        table.index('serverId');
        table.index('protocol');
        table.index('port');
        table.index('password');
        table.index('name');
        table.index('comment');
        table.index('createdTime');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('node');
};
