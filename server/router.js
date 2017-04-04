const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const sqlData = require('./controllers/getSensorsData');
const Users = require('./controllers/users');
// const getLastData = require('./controllers/getLastData');

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
    app.get('/getSensorsData', function (req, res) {
        sqlData.getData(res, 'GetSensors');
    });
    app.get('/getLastData', function (req, res) {
        sqlData.getData(res, 'GetLastData');
    }); 
    app.get('/admin/users', Users.getAllUsers);
    app.put('/admin/users', Users.updateUser);
    app.post('/admin/users', Users.createUser);
    app.post('/admin/delUsers', Users.deleteUsers);
   
};