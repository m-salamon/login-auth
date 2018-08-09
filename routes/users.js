var router = require('express-promise-router')()

import  db from '../repo';
var  sendTempToken = require('../utils/emailSender');

router.get('/getUserProfile', async (req, res) => {
    let profile = await db.users.getUserProfile(req.userId);
    console.log(profile)
    profile ? res.json({ success: true, profile: profile }) : '';
});
router.get('/checkLog', async (req, res) => {
    let user = await db.users.check(req.userId);
    console.log('user', user)
    if(user){
        res.json({ isLoggedIn: true });
    }else{
        res.json({ isLoggedIn: false });
    }
});

module.exports  =  router;