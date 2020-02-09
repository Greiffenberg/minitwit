import mongoose from 'mongoose';

const followerSchema = new mongoose.Schema({
    who_id : {
        type: String,
        required: true
    },
    whom_id : {
        type: String,
        required: true
    }
})

const Follower = mongoose.model('Follower', followerScema);

exports.Follower = Follower;