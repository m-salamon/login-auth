var express = require('express');
var router = express.Router();
var repo = require('../repo');
var  sendTempToken = require('../utils/emailSender');

router.get('/getUserProfile', async (req, res) => {
    let profile = await db.users.getUserProfile(req.userId);
    profile ? res.json({ success: profile }) : '';
});
router.get('/checkLog', async (req, res) => {
    let user = await db.users.check(req.userId);
    if(user){
        res.json({logIn:true});
    }
});

module.exports = router;