const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({ //this is the part which sends the email so it contain all info about host
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'rohitjoshi0500@gmail.com',
        pass: 'hskmwdxfbdpauvxp'
    }
});

let renderTemplate = (data, relativePath)=>{ //we will send html email which will be in views
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('error in rendering template',err);
                return ;
            }

            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}