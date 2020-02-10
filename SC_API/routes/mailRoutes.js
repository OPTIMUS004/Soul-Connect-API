const express = require('express');
const mailRouter = express.Router();

function routes(transporter){                                                       // Routes function to be executed
mailRouter.route('/')
.post((req, res) => {
  const { username, msg, chap } = req.body;
   // Message format to be sent
   console.log(username, msg, chap)
   const mailOption = {
    from: `Soul Connect`,
    to: `${chap}`,
    subject: `SC Client -  ${username}`,
    html: `${msg}`
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

module.exports = routes