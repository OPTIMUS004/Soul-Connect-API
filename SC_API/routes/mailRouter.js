const express = require('express');
const mailRouter = express.Router();

function routes(transporter){                                                       // Routes function to be executed
mailRouter.route('/')
.post((req, res) => {
  const { username, msg, chap } = req.body;
   // Message format to be sent
   console.log(username, msg, chap)
   const mailOption = {
    from: 'macbrill13',
    to: ['tayoola13@yahoo.com', 'macbrill13@gmail.com'],
    subject: `SC Client -  ${username}`,
    html: `
        <html>
          <style>
            .heading{background-color: darkblue, color: #fff}
          </style>
          <header>
            <h3 class='heading'>Soul Connect</h3>
          </header>
          <body>
            ${msg}
          </body>
        </html>`
}
transporter.sendMail(mailOption, (error, info) => {
  if (error) {
    return console.log(error);
  } else{
    console.log('Email has been sent');
    res.send(info);
    }
  });
});
  return mailRouter;
}
/*
const mailOptions = {
  from: 'macbrill13"gmail.com',
  to: 'tayoola13@yahoo.com',
  Subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }else{
    console.log('Email sent: ' + info.response );
  }
});
*/

module.exports = routes