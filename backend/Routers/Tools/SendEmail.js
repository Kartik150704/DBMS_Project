const express = require('express');
const router = express.Router();


const nodemailer = require('nodemailer');

function sendEmail(emailId, subject, emailBody) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false,
            auth: {
                user: 'kartikyadavwork01@gmail.com',
                pass: 'dMtcR4OAC0JsZIqm'
            }
        });

        const mailConfigurations = {
            from: 'noreply@dbms.com',
            to: emailId,
            subject: subject,
            text: emailBody
        };

        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) {
                // If there's an error, reject the Promise with the error
                reject(error);
            } else {
                // If email sent successfully, resolve the Promise
                resolve(true);
            }
        });
    });
}


router.post('/sendEmail', async (req, resp) => {

    console.log(req.body)
    let emailId=req.body.emailId
    let subject =req.body.subject
    let emailBody=req.body.emailBody
    let response=await sendEmail(emailId,subject,emailBody);
    resp.send(response)

})

module.exports = router;