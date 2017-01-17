const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//can be made for facebook, google, another authorization. search passport facebook strategy

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
        if (user) {
            done(null, foundedUser);
        } else {
            done(null, false);
        }
    })
});

//tell passport to use this strategy
passport.use(jwtLogin);