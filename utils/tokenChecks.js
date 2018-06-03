import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express'

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send({ error: "Token is no longer valid" });
                return;
            } else {
                req.userId = (decoded.userId || decoded.vendorId);
                next();
            }
        });
    } else {
        res.status(403).send({ error: "No token" });
    }

}


export {
    checkToken
};