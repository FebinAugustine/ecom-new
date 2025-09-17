import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as sellerService from '../services/seller.service.js';

const registerSeller = asyncHandler(async (req, res) => {
    const seller = await sellerService.registerSellerService(req.body);
    return res.status(201).json(new ApiResponse(201, seller, "Seller registered successfully"));
});

const loginSeller = asyncHandler(async (req, res) => {
    const { seller, accessToken, refreshToken } = await sellerService.loginSellerService(req.body);
    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, { seller, accessToken, refreshToken }, "Seller logged in successfully"));
});

const logoutSeller = asyncHandler(async (req, res) => {
    await sellerService.logoutSellerService(req.user._id);
    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "Seller logged out successfully"));
});

const refreshSellerToken = asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await sellerService.refreshSellerTokenService(req.cookies.refreshToken);
    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, { accessToken, refreshToken }, "Token refreshed successfully"));
});

const getAllSellers = asyncHandler(async (req, res) => {
    const sellers = await sellerService.getAllSellersService();
    return res.status(200).json(new ApiResponse(200, sellers, "All sellers retrieved successfully"));
});

const getSellerById = asyncHandler(async (req, res) => {
    const seller = await sellerService.getSellerByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, seller, "Seller retrieved successfully"));
});

const updateSellerById = asyncHandler(async (req, res) => {
    const updatedSeller = await sellerService.updateSellerByIdService(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, updatedSeller, "Seller details updated successfully"));
});

const updateSellerBankDetails = asyncHandler(async (req, res) => {
    const updatedSeller = await sellerService.updateSellerBankDetailsService(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, updatedSeller, "Bank details updated successfully"));
});

const updateSellerAvatar = asyncHandler(async (req, res) => {
    const updatedSeller = await sellerService.updateSellerAvatarService(req.user._id, req.file.path);
    return res.status(200).json(new ApiResponse(200, updatedSeller, "Avatar updated successfully"));
});

const updateSellerPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const result = await sellerService.updateSellerPasswordService(req.user._id, oldPassword, newPassword);
    return res.status(200).json(new ApiResponse(200, result, "Password updated successfully"));
});

const forgotSellerPassword = asyncHandler(async (req, res) => {
    const result = await sellerService.forgotSellerPasswordService(req.body.email);
    return res.status(200).json(new ApiResponse(200, result, "Password reset code sent"));
});

const verifySellerForgotPasswordCode = asyncHandler(async (req, res) => {
    const { email, code, newPassword } = req.body;
    const result = await sellerService.verifySellerForgotPasswordCodeService(email, code, newPassword);
    return res.status(200).json(new ApiResponse(200, result, "Password reset successfully"));
});

const deleteSellerById = asyncHandler(async (req, res) => {
    const result = await sellerService.deleteSellerByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, result, "Seller deleted successfully"));
});

export {
    registerSeller,
    loginSeller,
    logoutSeller,
    refreshSellerToken,
    getAllSellers,
    getSellerById,
    updateSellerById,
    updateSellerBankDetails,
    updateSellerAvatar,
    updateSellerPassword,
    forgotSellerPassword,
    verifySellerForgotPasswordCode,
    deleteSellerById
};
