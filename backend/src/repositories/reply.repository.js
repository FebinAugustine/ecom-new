import Reply from '../models/reply.model.js';

export const createReply = async (replyData) => {
    const reply = new Reply(replyData);
    return await reply.save();
};

export const findReplyById = async (id) => {
    return await Reply.findById(id).populate('user', 'fullname email');
};

export const getRepliesByReviewId = async (reviewId) => {
    return await Reply.find({ review: reviewId }).populate('user', 'fullname email');
};

export const updateReplyById = async (id, updateData) => {
    return await Reply.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const deleteReplyById = async (id) => {
    return await Reply.findByIdAndDelete(id);
};
