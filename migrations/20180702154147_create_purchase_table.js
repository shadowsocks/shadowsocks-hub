exports.up = function (knex, Promise) {
    return knex.schema.createTable('purchase', function (table) {
        table.uuid('id').primary();
        table.uuid('userId').notNullable();
        table.uuid('productId').notNullable();
        table.uuid('paymentId').notNullable();
        table.bigInteger('createdTime').notNullable();
        table.foreign('userId').references('id').on('user');
        table.foreign('productId').references('id').on('product');
        table.foreign('paymentId').references('id').on('payment');
        table.index('id');
        table.index('userId');
        table.index('productId');
        table.index('paymentId');
        table.index('createdTime');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('purchase');
};
