import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    author_id:{
        type: String,
        required: true,
    },
    text : {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255,
        trim: true
    },
    pub_date:{
        type: Number,
        required: true,
        min: 0
    },
    flagged : {
        type: Boolean,
        default: false
    }
})

const Message = mongoose.model('Message', messageSchema);

exports.Message = Message;