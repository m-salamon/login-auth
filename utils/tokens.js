import jwt from 'jsonwebtoken';
//import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

export const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.AUTH_SECRET, {
        expiresIn: '1825d' //5 years
    });
}

export const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!_.isEmpty(token)) {
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
        res.status(403).send('Unauthrized')
    }

}