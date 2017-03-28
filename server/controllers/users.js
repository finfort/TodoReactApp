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

exports.saveUser = function (req, res, next) {
    debugger;

    User.findByIdAndUpdate(req.body._id, {
        $set: {
            email: req.body.email,
            fio: req.body.fio,
            role: req.body.role,
            isActivated: req.body.isActivated
        }
    }, function (err, user) {
            if (err) return next(new Error('Could not find User'));
            console.log('The raw response from Mongo was ', user);
    });

};