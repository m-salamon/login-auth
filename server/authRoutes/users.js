import express from 'express-promise-router';
const authRouter = express();
import { Request, Response } from 'express';
import db from '../repo';
import { sendTempToken } from '../utils/emailSender';
import { createToken } from '../utils/tokens';

authRouter.post('/addUser', async (req, res) => {

    let count = await db.authRoutes.checkUserNameEmail(req.body.email);
    if (count) {
        res.json({ success: false });
        return;
    }
    let id = await db.users.createUser(req.body);
    let result = await db.users.getTokenById(id[0]);
    sendTempToken(req.body.email, result.tempToken, 'verify');
    res.json({ success: true, token: createToken(id[0]),userIdType:'userId'});
});
authRouter.get('/verify/:tempToken', async (req, res) => {
    let tempToken =  req.params.tempToken;
    let user =  await db.users.verifyTempToken(tempToken);
    if(user) {
        await db.users.updateDbWithTokenIsVerified(user.id);
        res.json({match: true});
    } else {
        res.json({match: false});
    }
});

export default authRouter;