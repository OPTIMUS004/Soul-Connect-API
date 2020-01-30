// Dependecies
const passport = require('passport');
const app = require('express')
require ('./strategies/local.strategies');

module.exports = function passportConfig() {
    app.use(passport.initialize());
    app.use(passport.session());

    // Stores user in the session
passport.serializeUser((user, done)=>{
    done(null, user)
});

// Retrieves user from session
passport.deserializeUser((user, done)=>{
    done(null, user)
})
}





module.exports = passport