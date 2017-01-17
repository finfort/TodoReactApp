const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//pre save encrypt passwords
userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash; // assign encrypted password
            next();// call next middleware
        });
    })

});

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
