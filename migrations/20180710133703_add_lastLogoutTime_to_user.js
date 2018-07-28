
exports.up = function (knex, Promise) {
    return knex.schema.table('user', function (table) {
        table.bigInteger('lastLogoutTime');
        table.index('lastLogoutTime');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('user', function (table) {
        table.dropIndex('lastLogoutTime');
        table.dropColumn('lastLogoutTime');
    });
};
