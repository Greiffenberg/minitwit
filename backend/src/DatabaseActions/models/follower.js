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

const Follower = mongoose.model('Follower', followerSchema);

exports.Follower = Follower;