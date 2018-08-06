/**
 * Created by neel on 1/4/17.
 */

let nodemailer = require('nodemailer');
let smtpTransport = require("nodemailer-smtp-transport");
let q = require('q');
let transporter;
class Mailer {
    constructor() {

    }

    sendMail(data) {
        console.log("---------------IN SEND MAIL-------------");
        transporter = nodemailer.createTransport(smtpTransport({
            host: "smtp.gmail.com",
            secureConnection: false,
            port: 587,
            auth: {
                "pass": "submanager123",
                "user": "noreply.subscriptionmanger@gmail.com"
            },
            logger: true
        }));
        let deferred = q.defer();
        let mailOptions = {
            from: "noreply.subscriptionmanger@gmail.com",
            to: data.to,
            cc: data.cc,
            subject: data.subject,
            text: data.text,
            html:data.html

        };

        if(data.fileName){
            mailOptions.attachments= [{
                filename: data.fileName,
                path: data.path,
                contentType: 'application/pdf'
            }]
        }
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log('error : ' + error);
                deferred.reject('Error : ' + error);
            } else {
                console.log('SMTP configuration verified : ' + success);
                transporter.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log('Send mail error : ' + error);
                        deferred.reject(error);
                    } else {
                        deferred.resolve(true);
                    }
                });
            }
        });
        return deferred.promise;
    }
}

module.exports = Mailer;