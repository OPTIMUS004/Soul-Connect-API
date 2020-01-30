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
        console.log(err);
        return res.send('Invalid Credentials');
      }else{
      user.save();
      res.status(201);
      return res.json(user);
      }
    }
    function get (req, res) {
      const query = {};
      if( req.query.firstname ){
        query.firstname = req.query.firstname;
      }
      User.find(query, (err, users) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        console.log(users);
        return res.json(users);
      }) 
    }
    return { post, get };
} 

module.exports = usersController;