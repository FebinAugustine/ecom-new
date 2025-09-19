import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as likeService from '../services/like.service.js';

const getLikedProducts = asyncHandler(async (req, res) => {
    const likedProducts = await likeService.getLikeByUserIdService(req.user._id);
    return res.status(200).json(new ApiResponse(200, likedProducts, "Liked products retrieved successfully"));
});

const addProductToLikes = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const likedProducts = await likeService.addProductToLikeService(req.user._id, productId);
    return res.status(200).json(new ApiResponse(200, likedProducts, "Product added to likes successfully"));
});

const removeProductFromLikes = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const likedProducts = await likeService.removeProductFromLikeService(req.user._id, productId);
    return res.status(200).json(new ApiResponse(200, likedProducts, "Product removed from likes successfully"));
});

export {
    getLikedProducts,
    addProductToLikes,
    removeProductFromLikes
};
