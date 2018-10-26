import jwt from 'jsonwebtoken';
import _ from 'lodash'

export const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.AUTH_SECRET, {
        expiresIn: 30  //'1825d' //5 years
    });
}

export const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!_.isEmpty(token)) {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                res.json({ error: err.name });
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