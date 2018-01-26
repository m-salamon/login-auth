import  bcrypt from 'bcryptjs';
import crypto from 'crypto';
import db from './index';


function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

function comparePassword(storedPassowrd, enteredPassword) {
    return bcrypt.compare(enteredPassword, storedPassowrd);
}

function getToken() {
    return crypto.randomBytes(16).toString('hex');
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
    hashPassword,
    getToken,
    comparePassword,
    logIn
}
