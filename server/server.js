const result = require('dotenv').config();
// if (result.error) {
//   throw result.error
// }
// console.log(result.parsed)

//import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes';
import { authRouter } from './authRoutes';
import { checkToken } from './utils/tokens';
//const app = express()
var express = require('express');
var app = express()



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import index from './routes/index'


app.use('/', index);
//app.use('/api', checkToken, router);
app.use('/auth', authRouter);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));

