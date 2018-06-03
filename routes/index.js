// var express = require('express');
// var router = express.Router();
var router = require('express-promise-router')()
var users = require('./users')

router.use('/users', users);

export { router }
