'use strict';

require('dotenv').config();

module.exports = {
    production: {
        client: 'mysql',
        connection: {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            port: process.env.DATABASE_PORT,
            password: process.env.DATABASE_PASSWORD,
            database: 'sshub',
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        },
        useNullAsDefault: true,
    },

    development: {
        client: 'mysql',
        connection: {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            port: process.env.DATABASE_PORT,
            password: process.env.DATABASE_PASSWORD,
            database: 'sshub_dev',
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        },
        useNullAsDefault: true,
    },

    test: {
        client: 'mysql',
        connection: {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            port: process.env.DATABASE_PORT,
            password: process.env.DATABASE_PASSWORD,
            database: 'sshub_test',
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        },
        useNullAsDefault: true,
    },
};