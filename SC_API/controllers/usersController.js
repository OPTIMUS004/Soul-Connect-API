const bcrypt = require('bcrypt'); 

function usersController (User) {
  function post(req, res) {
      const user = new User(req.body);
      if(!req.body.username || 
         !req.body.password ||
         !req.body.firstname ||
         !req.body.lastname ||
         !req.body.dob ||
         !req.body.age ||
         !req.body.gender ||
         !req.body.email) {
        res.status(400);
        return res.send('Invalid Credentials');
      }else{
        req.login(user, () => {
          user.save();
          res.status(201);
          return res.json(req.user); 
        });
      }
    }
    
/*
function usersController (User) {
  function post(req, res) {
    
        bcrypt.hash(req.body.password, 10).then(
          (hash) => {
            const user = new User(req.body);
            user.password = hash;
          
        req.login(user, () => {
          user.save();
          res.status(201);
          return res.json(req.user); 
        });
      });
      }
 */

    function get (req, res) {
      const query = {};
      if( req.query.firstname ){
        query.firstname = req.query.firstname;
      }
      User.find(query, (err, users) => {
        if (err) {
          return res.send(err);
        }
        const returnUsers = users.map((user) => {
          const newUser = user.toJSON();
          newUser.links = {};
          newUser.links.self = `http://${req.headers.host}/api/users/${user._id}`;
          return newUser;
        });
        return res.json(returnUsers);
      })
    }
    return { post, get };
} 

module.exports = usersController;