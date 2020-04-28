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
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers", 'Origin,X-requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE,PATCH,OPTIONS');
  next();
});
app.use(bodyParser.urlencoded({extended: true}));               // Allow body parser to access the post requests body
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session( { secret: "integralSession" } ));
app.use(cors( { origin: 'https://soul-connect.netlify.app' }));
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
  </style>
  <body>
    <h1>Welcome to my API!</h1>
  </body>
    `);
});
server.listen(3300);
app.server = app.listen(port, () => {                           // Connection to app is open
  console.log(`Running on port: ${port}`);
});

module.exports = app;                                           // Makes it available as an export
