const express = require('express');                                             // Import from package manager
const userController = require('../controllers/usersController');         // Import usertscontroller file
const passport = require('passport');

function routes(User){                                                       // Routes function to be executed
  const userRouter = express.Router();                                       // Create an instance of Express Router handler
  const controller = userController(User);                                   // A variable to control the routes for testing externally 

  userRouter.route('/users')                                                 // Api call to /api/users
  .get( controller.get )                                                     // Get all users router function 
  .post( controller.post );                                                  // Post an item users router function

  userRouter.use('/users/:userId', (req, res, next) => {                      // Middleware to hold data for a user  
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  userRouter.route('/users/:userId')
  
  .get((req, res) => {
    console.log('here for a user', req.user);
    res.json(req.user)})                                 // Get one user router function 
  
  .delete((req, res) => {                                              // Deletes the user
        req.user.remove((err) => {
          if (err) {
            return res.send(err);
          }
          return res.sendStatus(204);
        });
      })
  .put(                                                                      // Replace all data of  the user
     (req, res) => {
        const { user } = req.body;
           user.username = req.body.username;
          user.password = req.body.password;
          user.lastname = req.body.lastname;
          user.firstname = req.body.firstname;
          user.dob = req.body.dob;
          user.gender = req.body.gender;
          user.email = req.body.email;
          user.age = req.body.age;
         user.bodyType = req.body.bodyType;
           user.height = req.body.height;
           user.weight = req.body.weight;
           user.preference = req.body.preference;
           user.rStatus = req.body.rStatus;
         user.genotype = req.body.genotype;
          user.bloodGroup = req.body.bloodGroup;
          user.kids = req.body.kids; 
          user.educationLevel = req.body.educationLevel;
          user.ethnicity = req.body.ethnicity;
          user.sect = req.body.sect;
         user.workStatus = req.body.workStatus;
         user.favorite = req.body.favorite;
          user.proposals = req.body.proposals;
          user.aboutYou = req.body.aboutYou;
           user.expectancy= req.body.expectancy; 
           user.outlook = req.body.outlook;
             
           req.user.save(err => {
              if (err) {
                return res.send(err);
              }
              return res.json(user);
            })
        });
        userRouter.route('/login')
        .post((req, res, next) => {
          console.log('trying to login');
          passport.authenticate('local', { session: false }, ( err, passportUser, info ) => {
            if (err){ return next(err); 
            }if (passportUser){
              const user = passportUser;
              if(!user) { res.sendStatus(403); }
              if(err) { return next(err); }
              req.logIn(user, () => {
                user.save();
                return res.json(req.user);
              }) 
            }
          })(req, res, next);
      });
      userRouter.route('/patch/:userId')
      .patch((req, res) => {                
        User.findById(req.params.userId, (err, user) => {
          if (err) {
            return res.send(err);
          }
          if (req.body._id) {
            delete req.body._id;
          }
          Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            user[key] = value;
          });
          user.save();
          console.log('Patched');
          res.send(user);
        });
      });
      userRouter.route('/currentIdentity')
      .get((req, res) => {
        console.log(!!req.user);
        res.send(req.user);
      });

    return userRouter;
}

module.exports = routes; 