import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    author_id:{
        type: ObjectId,
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
        type: Date,
        default: Date.now,
        required: true
    },
    flagged : {
        type: Boolean,
        default: false
    }
})

const Message = mongoose.model('Message', messageSchema);

exports.Message = Message;