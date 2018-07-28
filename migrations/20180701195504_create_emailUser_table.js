
exports.up = function (knex, Promise) {
    return knex.schema.createTable('email_user', function (table) {
        table.uuid('id').notNullable();
        table.string('type').notNullable();
        table.string('username').notNullable().unique();
        table.string('hashedPassword').notNullable();
        table.string('resetPasswordToken');
        table.bigInteger('tokenCreatedTime');
        table.bigInteger('lastLoginTime');
        table.primary(['id', 'type']);
        table.foreign(['id', 'type']).references(['id', 'type']).on('user');
        table.foreign('username').references('email').on('user');
        table.index('id');
        table.index('type');
        table.index('username');
        table.index('lastLoginTime');
        table.index(['id', 'type']);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('email_user');
};
