import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'

function createToken(userId) {
    const tokenId = {
        userId: userId
    }
    return jwt.sign(tokenId, process.env.AUTH_SECRET, {
        expiresIn: 60 * 60 * 24
    });
}

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send({ error: "Token is no longer valid" });
                return;
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        res.status(403).send({ error: "No token" });
    }

}

export {
    checkToken,
    createToken
}
