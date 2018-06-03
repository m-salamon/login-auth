import  express from 'express-promise-router';
const router = express();
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { createToken } from '../utils/tokens';
import  db from '../repo';
import { emailSenderForgotPassword } from '../utils/emailSenderForgotPassword';


router.post('/login', async (req, res) => {
     let user = await db.authRoutes.logIn(req.body);
    if (user && user.isVerified) {
        res.json({success: true,token: createToken(user.id),userIdType: user.userType});
    } else if (user && !user.isVerified) {
        res.json({success: false,message: 'Plese verify your email' });
    }else {
        res.json({success: false, message: 'Cannot log In, Please check your email or password'});
        //res.status(403).send('Invalid Login');
    }
})

router.post('/forgotPassword', async (req, res) => {
    let createdtk = await db.authRoutes.createAndGetTempToken(req.body.email);
    let success = false;
    if (createdtk.result) {
        emailSenderForgotPassword(req.body.email, createdtk.tempToken, 'resetPassword');
        success = true;
    }
    res.json({ success: success });
})



router.post('/resetPassword/:tempToken', async (req, res) => {
    let verify = await db.authRoutes.verifyTempToken(req.params.tempToken);
    let updatedpw = await db.authRoutes.updatePassword(verify.id, req.body.newPassword, verify.table);
    if (updatedpw) {
        res.json({ success: true });
    }
})


export default router;