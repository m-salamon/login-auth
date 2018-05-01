import  express from 'express-promise-router';
const router = express();
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import  db from '../repo';
//import  authHelpers from '../repo/authHelpers';
import { emailSenderForgotPassword } from '../utils/emailSenderForgotPassword';


router.post('/login', async (req, res) => {
     let user = await db.authHelpers.logIn(req.body);
     console.log('in heere', user)
    if (user) {
        const signedId = {
            userId: user.id
        };
        const token = jwt.sign(signedId, process.env.AUTH_SECRET, {
            expiresIn: 60 * 60 * 24
        });
        res.json({
            success: true,
            token: token,
            userIdType: user.userType
        });
    } else {
        res.status(403).send('Invalid Login');
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