const express = require('express');                                             // Import from package manager

function routes(Chap){                                                       // Routes function to be executed
  const chapRouter = express.Router();                                        // Create an instance of Express Router handler

  chapRouter.route('/')
  .get((req, res) => {
    const query = {};
      if( req.query.username ){
        query.username = req.query.username;
      }
      Chap.find(query, (err, chaps) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        console.log(chaps);
        return res.json(chaps);
      })
    })
  .post((req, res) => {
    const chap = new Chap(req.body);
      if(!req.body.username || 
         !req.body.password ||
         !req.body.email) {
        res.status(400);
        return res.send('Invalid Credentials');
      }else{
          chap.save();
          res.status(201);
          return res.json(chap); 
        }
    });

return chapRouter;
};

module.exports = routes
