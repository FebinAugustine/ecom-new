import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as wishlistService from '../services/wishlist.service.js';

const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.getWishlistByUserIdService(req.user._id);
    return res.status(200).json(new ApiResponse(200, wishlist, "Wishlist retrieved successfully"));
});

const addProductToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const wishlist = await wishlistService.addProductToWishlistService(req.user._id, productId);
    return res.status(200).json(new ApiResponse(200, wishlist, "Product added to wishlist successfully"));
});

const removeProductFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const wishlist = await wishlistService.removeProductFromWishlistService(req.user._id, productId);
    return res.status(200).json(new ApiResponse(200, wishlist, "Product removed from wishlist successfully"));
});

export {
    getWishlist,
    addProductToWishlist,
    removeProductFromWishlist
};
