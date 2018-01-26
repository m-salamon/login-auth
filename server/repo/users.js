import knex from './config';
import authHelpers from './authHelpers';

async function createUser(profile) {
    let hashed = await authHelpers.hashPassword(profile.password);
    profile.password = hashed;
    profile.tempToken = authHelpers.getToken();
    return knex('users').insert(profile).returning('id');
}

function getTokenById(id) {
    return knex('users').select('tempToken').where('id', id).first();
}

function verifyTempToken(tempToken) {
    return knex('users').select('id').where('tempToken', tempToken).first();
}
function getUserByEmail(email) {
    return knex('users').select('id').where('email', email).first();
}
function getUserProfile(id) {
    return knex('users').select('firstName', 'lastName', 'phoneNumber', 'email').where('id', id).first();
}
function updateUserProfile(object, id) {
    return knex('users').update(object).where('id', id);
}
function updateDbWithTokenIsVerified(id) {
    return knex('users').where('id', id).update('isVerified', true);
}
async function check(id) {
    let user = await knex('users').where('id', id).select() || await knex('vendorProfiles').where('id', id).select();
    return user;
}
async function loginUser(login) {
    let user = await knex('users').select().where('email', login.email).first();
    if (user) {
        let passwordsMatch = await authHelpers.comparePassword(user.password, login.password);
        if (passwordsMatch) {
            return user;
        }
    }
}
function getCart(simchaId) {
    return knex('cart as c').join('simchas as s', 's.id', 'c.simchaId')
        .join('users as u', 'u.id', 's.userId')
        .join('vendorprofiles as v', 'v.id', 'c.vendorId')
        .where('c.simchaId', simchaId)
        .select('v.firstName', 'v.lastName', 'v.email', 'v.service');
}

export default{
    createUser,
    getTokenById,
    updateUserProfile,
    verifyTempToken,
    updateDbWithTokenIsVerified,
    getCart,
    getUserByEmail,
    loginUser,
    getUserProfile,
    check
}  