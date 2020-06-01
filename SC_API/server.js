'@Integral'
                                 /* API PRACTICE TEMPLATE FOR ALIAS ONLINE SHOP */                     
const express = require('express');                             // Makes an instance of express package
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const nodemailer = require('nodemailer');                       // Email handler

const app = express();                                          // Assigns the instance of express to a reusable variable
const { mongoose } = require('./db.js');                        // Establish connection with db

const User = require('./models/userModel');                     // format expected of the model;
const Chap = require('./models/chapModel');

// Email transporter instance;
const transporter = nodemailer.createTransport({
  service: "gmail.com",
  auth: {
      user: "macbrill13",
      pass: "macbrilla"
  }
});

const userRouter = require('./routes/userRouter')(User);        // Creates an instance of roter and assigns it to
const chapRouter = require('./routes/chapRouter')(Chap);
const mailRouter = require('./routes/mailRoutes')(transporter);
require('./config/passport.js')(app);

const port = process.env.PORT || 3000;                          // imports the port from nodemon config in package.json

// Dependencies for socket
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(function(req,res, next){
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers", 'Origin,X-requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE,PATCH,OPTIONS');
  next();
});
app.use(bodyParser.urlencoded({extended: true}));               // Allow body parser to access the post requests body
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session( { secret: "integralSession" } ));
app.use(cors( { origin: 'http://localhost:4200' }));  //soul-connect.netlify.app
app.use('/api', userRouter);                                    // Communicates the router to the app
app.use('/api/chap', chapRouter);
app.use('/api/sendmail', mailRouter);

io.on('connection', (client) => {
  console.log('User Connected');

  client.on('newMessage', (message)=>{
    io.emit('newMessage', message);
    console.log(message);
  });
});

app.get('/', (req, res) => {                                    // Response for the root of the app port
  res.send(`
  <style>
    body{color: white; background-color: #2C66B8 }
    .content {
      margin-left: auto;
      margin-right: auto;
      width: 65%;
      min-width: 33em;
      max-width: 80em;
    }
    .header{
    background-color: #4A7CC2;
    border-bottom: solid 0.104em #7198C1;
    border-top: solid 0.104em #7198C1;
    color: #FFFFFF;
    margin-bottom: 0.625em;
    margin-top: 0.9375em;
    padding: 0.1875em 0;
    text-align: center;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.5);
}
  </style>
  <body>
    <div class='content'>
      <h1 claa='header'>Welcome SOUL CONNECT SERVER!</h1>
    <div>
  </body>
    `);
});
server.listen(3300);
app.server = app.listen(port, () => {                           // Connection to app is open
  console.log(`Running on port: ${port}`);
});

module.exports = app;                                           // Makes it available as an export
