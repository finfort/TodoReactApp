const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
//can be made for facebook, google, another authorization. search passport facebook strategy

//create local strategy to authenticate with email and password then provide jwt token to user
//use email instead username by default
const localLogin = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
    //verify this email and password, call done with user
    // if it is the correct email and password
    //otherwise, call done with false
    User.findOne({ email: email }, function (err, user) {
        if (err) return done(err);
        if (!user) { return done(null, false); }// no user found with this credentials

        //compare passwords - is 'password' equal to user.password
        user.comparePasswords(password, function(err, isMatch){
            if(err) return done(err);
            if(!isMatch) return done(null, false); // paswords not matched no user provided

            return done(null, user); // if matched return user;
            // done give us req.user in signin.post route
        });
    });

});

//set options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};
//create jwt strategy 
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    //payload its subject and issued at time property from jwt.encode
    //done verifiedcallback when we successfully authenticate user

    //so see if ther user ID in the payload exists in our database
    // if it does, call 'done' with that user
    // otherwise, call done without a user object
    User.findById(payload.sub, function (err, foundedUser) {
        if (err) return done(err, false);
        if (foundedUser) {
            done(null, foundedUser);
        } else {
            done(null, false);
        }
    })
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);