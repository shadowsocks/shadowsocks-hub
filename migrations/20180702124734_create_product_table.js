
exports.up = function (knex, Promise) {
    return knex.schema.createTable('product', function (table) {
        table.uuid('id').primary();
        table.string('name').notNullable().unique();
        table.bigInteger('traffic');
        table.string('period');
        table.integer('price');
        table.bigInteger('createdTime').notNullable();
        table.index('id');
        table.index('name');
        table.index('traffic');
        table.index('period');
        table.index('price');
        table.index('createdTime');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('product');
};
