require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes';
import { authRouter } from './authRoutes';
import { checkToken } from './utils/tokens';
const app = express()

import index from './routes/index'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use('/', index);
//app.use('/api', checkToken, router);
app.use('/auth', authRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));

