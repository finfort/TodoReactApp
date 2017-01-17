const User = require('../models/user');

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // check if user with given email exists
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            console.log(err);
            return next(err);
        }
        //if user doest exist return error on request
        if (existingUser)
            return res.status(422).send({ "error": "Email is in use" });// unprocessable entity given email is already exist so give me another



        //if user with email doesnt exist and its unique regiester this user
        const user = new User({
            email: email,
            password: password
        });

        user.save(function (err) { //save user to mongo and recieve callback when its done 
            if (err) next(err);
            res.json(user);
        })


    });

}