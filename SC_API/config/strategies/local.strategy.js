const passport = require('passport');
const { Strategy } = require ('passport-local');
const User = require('../../models/userModel');                     // format expected of the model;

module.exports = function localStrategy(){
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done)=> {
        User.findOne( {username} )
        .then((user) => {
            if(!user || !(user.password === password)) {
                console.log("failed");
                return done(null, false, {errors: "Email or password is invalid"});
            }else{
            return done(null, user);
            }
        }).catch(done);
        

    }));
}