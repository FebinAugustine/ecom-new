import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as adminService from '../services/admin.service.js';

const registerAdmin = asyncHandler(async (req, res) => {
    const admin = await adminService.registerAdminService(req.body);
    return res.status(201).json(new ApiResponse(201, admin, "Admin registered successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { admin, accessToken, refreshToken } = await adminService.loginAdminService(req.body);
    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, { admin, accessToken, refreshToken }, "Admin logged in successfully"));
});

const logoutAdmin = asyncHandler(async (req, res) => {
    await adminService.logoutAdminService(req.user._id);
    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "Admin logged out successfully"));
});

const refreshAdminToken = asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await adminService.refreshAdminTokenService(req.cookies.refreshToken);
    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, { accessToken, refreshToken }, "Token refreshed successfully"));
});

const getAdminById = asyncHandler(async (req, res) => {
    const admin = await adminService.getAdminByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, admin, "Admin retrieved successfully"));
});

const updateAdminById = asyncHandler(async (req, res) => {
    const updatedAdmin = await adminService.updateAdminByIdService(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, updatedAdmin, "Admin details updated successfully"));
});

const updateAdminPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const result = await adminService.updateAdminPasswordService(req.user._id, oldPassword, newPassword);
    return res.status(200).json(new ApiResponse(200, result, "Password updated successfully"));
});

const forgotAdminPassword = asyncHandler(async (req, res) => {
    const result = await adminService.forgotAdminPasswordService(req.body.email);
    return res.status(200).json(new ApiResponse(200, result, "Password reset code sent"));
});

const verifyAdminForgotPasswordCode = asyncHandler(async (req, res) => {
    const { email, code, newPassword } = req.body;
    const result = await adminService.verifyAdminForgotPasswordCodeService(email, code, newPassword);
    return res.status(200).json(new ApiResponse(200, result, "Password reset successfully"));
});

const deleteAdminById = asyncHandler(async (req, res) => {
    const result = await adminService.deleteAdminByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, result, "Admin deleted successfully"));
});

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAdminToken,
    getAdminById,
    updateAdminById,
    updateAdminPassword,
    forgotAdminPassword,
    verifyAdminForgotPasswordCode,
    deleteAdminById
};
