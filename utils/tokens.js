import jwt from 'jsonwebtoken';
//import { Request, Response, NextFunction } from 'express'

function createToken(userId) {
    return jwt.sign({ userId }, process.env.AUTH_SECRET, {
        expiresIn: '1825d' //5 years
    });
}

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];    

    if (token != 'null') {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                console.log('its not null err', err)
                res.status(403).send({ error: "Token is no longer valid" });
                return;
            } else {
                console.log('its not null err')

                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        console.log('hey')
       // res.json({ isLoggedIn: false });
        res.status(403).end()
    }

}

module.exports = {
    checkToken: checkToken,
    createToken: createToken
}
