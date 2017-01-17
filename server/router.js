const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//require to use passwport a jwt strategy for web app and disable session
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function (app) {
    app.get('/', requireAuth, function(req,res){
        res.send('hello authorezed');
    })
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}