const uuid = require('node-uuid');
const bcrypt = require('bcryptjs');

exports.up = async function (knex, Promise) {
    const password = "pleaseChangePassword";
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailUser = {
        id: uuid.v4(),
        type: "EmailUser",
        role: "admin",
        email: "admin@email.com",
        telegram: null,
        createdTime: Date.now(),
        hashedPassword: hashedPassword,
        username: "admin@email.com",
        resetPasswordToken: null,
        tokenCreatedTime: null,
        lastLoginTime: null
    };

    const userToSave = JSON.parse(JSON.stringify(emailUser));
    delete userToSave.username;
    delete userToSave.hashedPassword;
    delete userToSave.resetPasswordToken;
    delete userToSave.tokenCreatedTime;
    delete userToSave.lastLoginTime;

    const emailUserToSave = JSON.parse(JSON.stringify(emailUser));
    delete emailUserToSave.role;
    delete emailUserToSave.email;
    delete emailUserToSave.telegram;
    delete emailUserToSave.createdTime;

    await knex.transaction(async function (trx) {
        await trx.insert(userToSave).into('user');
        await trx.insert(emailUserToSave).into('email_user');
    });
};

exports.down = async function (knex, Promise) {
    await knex.transaction(async function (trx) {
        await trx.delete().from('email_user').where('username', 'admin@email.com');
        await trx.delete().from('user').where('email', 'admin@email.com');
    });
};
