import * as express from 'express-promise-router';
const router = express();
import { Request, Response } from 'express';
import * as db from '../repo';



router.get('/:tempToken', async (req: Request, res: Response) => {
    let status = {status: false};
    let verifying = await db.vendors.verifyTempToken(req.params.tempToken);
    if(verifying){
        status = {status: true};
    }
    let isVerfied = await db.vendors.setIsVerified(verifying.id, verifying);
    res.json(status);
});









export default router;