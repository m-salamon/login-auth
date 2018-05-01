require('dotenv').config();
import nodemailer from 'nodemailer';

export function sendTempToken(email, token, url) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });



    let mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'Verify Email Address',
        html: `<div>Click below to verfiy</div><button><a href="http://localhost:3000/${url}/${token}">Verify</a></button>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('error: ', error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
