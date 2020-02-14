const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    who_id : {
        type: ObejctId,
        required: true,
        ref: 'User'
    },
    whom_id : {
        type: ObejctId,
        required: true,
        ref: 'User'
    }
})

const Follower = mongoose.model('Follower', followerScema);

function validateFollower(follower) {
    // To be implemented
    return null;
}

exports.Follower = Follower;
exports.validate = validateFollower;