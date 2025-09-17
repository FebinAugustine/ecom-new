import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
    },
    reply: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema);

export default Reply;
