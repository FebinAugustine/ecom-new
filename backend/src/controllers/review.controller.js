import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as reviewService from '../services/review.service.js';

const createReview = asyncHandler(async (req, res) => {
    const review = await reviewService.createReviewService(req.body, req.user._id);
    return res.status(201).json(new ApiResponse(201, review, "Review created successfully"));
});

const getAllReviews = asyncHandler(async (req, res) => {
    const result = await reviewService.getAllReviewsService(req.query);
    return res.status(200).json(new ApiResponse(200, result, "Reviews retrieved successfully"));
});

const getReviewById = asyncHandler(async (req, res) => {
    const review = await reviewService.getReviewByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, review, "Review retrieved successfully"));
});

const getReviewsByProductId = asyncHandler(async (req, res) => {
    const reviews = await reviewService.getReviewsByProductIdService(req.params.productId);
    return res.status(200).json(new ApiResponse(200, reviews, "Reviews for product retrieved successfully"));
});

const updateReviewById = asyncHandler(async (req, res) => {
    // In a real app, you'd add logic here to ensure only the user who wrote the review or an admin can update it.
    const updatedReview = await reviewService.updateReviewByIdService(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, updatedReview, "Review updated successfully"));
});

const deleteReviewById = asyncHandler(async (req, res) => {
    // In a real app, you'd add logic here to ensure only the user who wrote the review or an admin can delete it.
    const result = await reviewService.deleteReviewByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, result, "Review deleted successfully"));
});

export {
    createReview,
    getAllReviews,
    getReviewById,
    getReviewsByProductId,
    updateReviewById,
    deleteReviewById
};
