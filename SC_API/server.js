                                /* API PRACTICE TEMPLATE FOR ALIAS ONLINE SHOP */                     

const express = require('express');                             // Makes an instance of express package
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();                                          // Assigns the instance of express to a reusable variable
const { mongoose } = require('./db.js');                        // Establish connection with db
const User = require('./models/userModel');                     // format expected of the model;
const userRouter = require('./routes/userRouter')(User);     // Creates an instance of roter and assigns it to

const port = process.env.PORT || 3000;                          // imports the port from nodemon config in package.json


app.use(bodyParser.urlencoded({extended: true}));               // Allow body parser to access the post requests body
app.use(bodyParser.json());
app.use(cors( { origin: 'http://localhost:4200' }));
app.use('/api', userRouter);                                  // Communicates the router to the app

app.get('/', (req, res) => {                                    // Response for the root of the app port
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {                                        // Connection to app is open
  console.log(`Running on port: ${port}`);
});

module.exports = app;                                           // Makes it available as an export  