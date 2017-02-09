const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const getSensorsData = require('./controllers/getSensorsData');
const getLastData = require('./controllers/getLastData');

//require to use passwport a jwt strategy for web app and disable session
const requireAuth = passport.authenticate('jwt', { session: false }); // make protected route by use of jwt toket
const requireSignin = passport.authenticate('local', { session: false }); // give token by providing email password

module.exports = function (app) {
    app.get('/', requireAuth, function (req, res) {
        res.send({ message: 'hello authorized' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup); // how to sign in after this action?

    // TODO return to authorized user
    // app.get('/getSensorsData', function (req, res) {
    //     // res.send( console.log(res) );
    //     getSensorsData.getSensorsData((err, content)=>{
    //         if(!err){
    //             res.send(content);
    //         }
    //     });
    //     // res.send({ message: 'getSensorsData' });        
    // });
    app.get('/getSensorsData', getSensorsData.getSensorsData);

    app.get('/getLastData', getLastData.getLastData); // return 
};