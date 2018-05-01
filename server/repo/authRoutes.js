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
    let vendortk = await knex('vendorProfiles').select('id').where('tempToken', tempToken).first();
    let usertk = await knex('users').select('id').where('tempToken', tempToken).first();
    let result = {
        id: (vendortk ? vendortk.id : usertk.id),
        table: (vendortk ? 'vendorProfiles' : 'users')
    }

    return result;
}
async function checkUserNameEmail(email) {
     console.log('in here')
    const exists1 = await db.users.getUserByEmail(email);
    if (exists1) {
        return true;
    }
    return false;
}
async function updatePassword(id, newPassword, table) {
    let hashed = await hashHelpers.hashPassword(newPassword);
    return knex(table).update('password', hashed).where('id', id);

}


export default{
    createAndGetTempToken,
    verifyTempToken,
    updatePassword,
    checkUserNameEmail
}