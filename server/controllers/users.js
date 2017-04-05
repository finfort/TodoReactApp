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

exports.createUser = function (req, res, next) {
    console.log(req.body);
    User.create({
        // _id: req.body._id,
        email: req.body.email,
        fio: req.body.fio,
        role: req.body.role,
        isActivated: req.body.isActivated

    }, function (err, user) {
        // debugger;
        if (err) return next(new Error('Could not create User'+ err));
        console.log("db row created" );
        // console.log(user);
    });

};

exports.updateUser = function (req, res, next) {
    // console.log(req.body);
    User.findByIdAndUpdate(req.body._id, {
        $set: {
            email: req.body.email,
            fio: req.body.fio,
            role: req.body.role,
            isActivated: req.body.isActivated
        }
    }, function (err, user) {
        if (err) return next(new Error('Could not find User'));
        console.log("db saved");
        // console.log(user);
    });

};

exports.deleteUsers = function (req, res, next) {
    // console.log(req.body);
    User.remove({ _id: req.body._id }, function (err) {
        if (err) return console.log(err);
        console.log("removed!" +  req.body._id );
    });

};