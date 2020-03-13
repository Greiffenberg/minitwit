const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: 5,
        maxLength: 255
    }
})

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    // To be implemented
    return user;
}

module.exports.User = User;
module.exports.validate = validateUser;