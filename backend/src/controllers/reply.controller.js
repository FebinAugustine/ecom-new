import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as replyService from '../services/reply.service.js';

const createReply = asyncHandler(async (req, res) => {
    const reply = await replyService.createReplyService(req.body, req.user._id);
    return res.status(201).json(new ApiResponse(201, reply, "Reply created successfully"));
});

const getRepliesByReviewId = asyncHandler(async (req, res) => {
    const replies = await replyService.getRepliesByReviewIdService(req.params.reviewId);
    return res.status(200).json(new ApiResponse(200, replies, "Replies retrieved successfully"));
});

const updateReplyById = asyncHandler(async (req, res) => {
    // In a real app, you'd add logic here to ensure only the user who wrote the reply or an admin can update it.
    const updatedReply = await replyService.updateReplyByIdService(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, updatedReply, "Reply updated successfully"));
});

const deleteReplyById = asyncHandler(async (req, res) => {
    // In a real app, you'd add logic here to ensure only the user who wrote the reply or an admin can delete it.
    const result = await replyService.deleteReplyByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, result, "Reply deleted successfully"));
});

export {
    createReply,
    getRepliesByReviewId,
    updateReplyById,
    deleteReplyById
};
