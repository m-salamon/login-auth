var   bcrypt = require('bcryptjs')
var crypto = require('crypto');
var db = require( './index')


function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

function getToken() {
    return crypto.randomBytes(16).toString('hex');
}

function comparePassword(storedPassowrd, enteredPassword) {
    return bcrypt.compare(enteredPassword, storedPassowrd);
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

export default {
    hashPassword,
    getToken,
    comparePassword,
    logIn
}
