import * as replyRepository from '../repositories/reply.repository.js';
import * as reviewRepository from '../repositories/review.repository.js';
import ApiError from '../utils/ApiErrors.js';
import redisClient from '../config/redis.js';

export const createReplyService = async (replyData, userId) => {
    const { review, reply } = replyData;

    if (!review || !reply) {
        throw new ApiError(400, "Review and reply are required");
    }

    const newReply = await replyRepository.createReply({ ...replyData, user: userId });

    // Add the reply to the review's replies array
    const reviewToUpdate = await reviewRepository.findReviewById(review);
    reviewToUpdate.replies.push(newReply._id);
    await reviewToUpdate.save();

    // Invalidate caches
    await redisClient.del(`replies:${review}`);

    return newReply;
};

export const getRepliesByReviewIdService = async (reviewId) => {
    const cacheKey = `replies:${reviewId}`;
    const cachedReplies = await redisClient.get(cacheKey);
    if (cachedReplies) {
        return JSON.parse(cachedReplies);
    }

    const replies = await replyRepository.getRepliesByReviewId(reviewId);
    await redisClient.set(cacheKey, JSON.stringify(replies), 'EX', 3600);
    return replies;
};

export const updateReplyByIdService = async (replyId, updateData) => {
    const updatedReply = await replyRepository.updateReplyById(replyId, updateData);
    if (!updatedReply) {
        throw new ApiError(404, "Reply not found");
    }

    // Invalidate caches
    await redisClient.del(`replies:${updatedReply.review}`);

    return updatedReply;
};

export const deleteReplyByIdService = async (replyId) => {
    const reply = await replyRepository.findReplyById(replyId);
    if (!reply) {
        throw new ApiError(404, "Reply not found");
    }

    // Remove the reply from the review's replies array
    const review = await reviewRepository.findReviewById(reply.review);
    if (review) {
        review.replies.pull(reply._id);
        await review.save();
    }

    await replyRepository.deleteReplyById(replyId);

    // Invalidate caches
    await redisClient.del(`replies:${reply.review}`);

    return { message: "Reply deleted successfully" };
};
