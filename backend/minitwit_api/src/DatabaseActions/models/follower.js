const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const followerSchema = new mongoose.Schema({
    who_id : {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    whom_id : {
        type: ObjectId,
        required: true,
        ref: 'User'
    }
})

const Follower = mongoose.model('Follower', followerSchema);

function validateFollower(follower) {
    // To be implemented
    return follower;
}

exports.Follower = Follower;
exports.validate = validateFollower;