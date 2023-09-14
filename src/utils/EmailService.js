/// logic to handle sending email using nodemailer



const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
// async..await is not allowed in global scope, must use a wrapper

router.post("/mail",async (req, res)=>{

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: true,
      auth: {
        user: '',
        pass: ''
      },
    });

    
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '', // sender address
      to: "", // list of receivers
      subject: "IMPORTANT", // Subject line
      text: "This is an email from the team of UC technologies", // plain text body
      html: "<b></b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
  
});
 

module.exports= router;
