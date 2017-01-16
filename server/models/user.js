const mongoose = require('mongoose');
const Schema = mogoose.Schema;

const userSchema  = new Schema ({
    email: { type: String, unique: true, lowercase: true },
    password: String
});


const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
