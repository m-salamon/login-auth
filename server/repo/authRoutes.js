import knex from './config';
import  hashHelpers from './authHelpers';
import db from './index';

async function createAndGetTempToken(email) {
    const tempToken = await hashHelpers.getToken();
    let tokenAddedToVendor = await knex('vendorProfiles').update('tempToken', tempToken).where('email', email);
    if (!tokenAddedToVendor) {
        var tokenAddedToUser = await knex('users').update('tempToken', tempToken).where('email', email);
    }
    let result = false;
    if (tokenAddedToVendor || tokenAddedToUser) {
        result = true;
    }
    return {
        result: result,
        tempToken: tempToken
    }
}

async function verifyTempToken(tempToken) {
    let usertk = await knex('users').select('id').where('tempToken', tempToken).first();
    let result = {
        id: usertk.id,
        table: 'users'
    }
    return result;
}
async function checkUserNameEmail(email) {
    const exists = await db.users.getUserByEmail(email);
    if (exists) {
        return true;
    }
    return false;
}
async function updatePassword(id, newPassword, table) {
    let hashed = await hashHelpers.hashPassword(newPassword);
    return knex(table).update('password', hashed).where('id', id);

}

async function logIn(login) {
    let userType = 'userId';
    let user = await db.users.loginUser(login);
    const final = (user);
    if (final) {
        final.userType = userType;
        return final;
    }
    return false;
}


export default{
    createAndGetTempToken,
    verifyTempToken,
    updatePassword,
    checkUserNameEmail,
    logIn
}