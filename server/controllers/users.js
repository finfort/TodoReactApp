const User = require('../models/user');

exports.getAllUsers = function (req, res, next) {
    // get all the users
    User.find({}, function (err, users) {
        if (err) throw err;
        // object of all the users
        // console.log(users);
        res.json(users);
    });
};

exports.saveUser = function(req, res, next){
    debugger;
    console.log(req.body);
};