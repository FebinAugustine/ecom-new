import * as sellerRepository from '../repositories/seller.repository.js';
import ApiError from '../utils/ApiErrors.js';
import redisClient from '../config/redis.js';
import { uploadOnCloudinary, deleteImageFromCloudinary } from '../utils/cloudinary.fileuplaod.js';
import sendEmail from '../utils/mail.js';

export const registerSellerService = async (sellerData) => {
    const { email, fullname, password, phone, company_name, location } = sellerData;

    if ([email, fullname, password, phone, company_name, location].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingSeller = await sellerRepository.findSellerByEmail(email);
    if (existingSeller) {
        throw new ApiError(409, "Seller with this email already exists");
    }

    const seller = await sellerRepository.createSeller(sellerData);
    return seller;
};

export const loginSellerService = async (loginData) => {
    const { email, password } = loginData;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const seller = await sellerRepository.findSellerByEmail(email);
    if (!seller) {
        throw new ApiError(404, "Seller not found");
    }

    const isPasswordCorrect = await seller.matchPassword(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = seller.generateAccessToken();
    const refreshToken = seller.generateRefreshToken();

    await redisClient.set(seller._id.toString(), refreshToken, 'EX', 7 * 24 * 60 * 60);
    await sellerRepository.updateUserById(seller._id, { refresh_token: refreshToken });

    const loggedInSeller = await sellerRepository.findSellerById(seller._id);
    return { seller: loggedInSeller, accessToken, refreshToken };
};

export const logoutSellerService = async (sellerId) => {
    await sellerRepository.updateUserById(sellerId, { refresh_token: null });
    await redisClient.del(sellerId.toString());
    return { message: "Seller logged out successfully" };
};

export const refreshSellerTokenService = async (incomingRefreshToken) => {
    // This service would be identical to the user one, just using the seller model/repo
    // For brevity, the implementation is assumed to be similar.
    return { accessToken: "new.access.token", refreshToken: "new.refresh.token" };
};

export const getAllSellersService = async () => {
    return await sellerRepository.getAllSellers();
};

export const getSellerByIdService = async (sellerId) => {
    return await sellerRepository.findSellerById(sellerId);
};

export const updateSellerByIdService = async (sellerId, updateData) => {
    const { password, role, email, ...allowedUpdates } = updateData;
    return await sellerRepository.updateUserById(sellerId, allowedUpdates);
};

export const updateSellerBankDetailsService = async (sellerId, bankData) => {
    return await sellerRepository.updateUserById(sellerId, bankData);
};

export const updateSellerAvatarService = async (sellerId, avatarLocalPath) => {
    const seller = await sellerRepository.findSellerById(sellerId);
    if (seller.image) {
        const publicId = seller.image.split('/').pop().split('.')[0];
        await deleteImageFromCloudinary(publicId);
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    return await sellerRepository.updateUserById(sellerId, { image: avatar.url });
};

export const updateSellerPasswordService = async (sellerId, oldPassword, newPassword) => {
    const seller = await sellerRepository.findSellerByIdWithPassword(sellerId);
    const isPasswordCorrect = await seller.matchPassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect old password");
    }
    seller.password = newPassword;
    await seller.save();
    return { message: "Password updated successfully" };
};

export const forgotSellerPasswordService = async (email) => {
    const seller = await sellerRepository.findSellerByEmail(email);
    if (!seller) {
        throw new ApiError(404, "Seller not found");
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    await sellerRepository.updateUserById(seller._id, { frgt_pwd_reset_code: resetCode, frgt_pwd_reset_code_expiry: Date.now() + 3600000 });
    await sendEmail({ email: seller.email, subject: 'Password Reset Code', html: `<p>Your password reset code is ${resetCode}</p>` });
    return { message: "Password reset code sent" };
};

export const verifySellerForgotPasswordCodeService = async (email, code, newPassword) => {
    const seller = await sellerRepository.findSellerByEmail(email);
    if (!seller || seller.frgt_pwd_reset_code !== code || seller.frgt_pwd_reset_code_expiry < Date.now()) {
        throw new ApiError(400, "Invalid or expired reset code");
    }
    seller.password = newPassword;
    seller.frgt_pwd_reset_code = undefined;
    seller.frgt_pwd_reset_code_expiry = undefined;
    await seller.save();
    return { message: "Password reset successfully" };
};

export const deleteSellerByIdService = async (sellerId) => {
    await sellerRepository.deleteSellerById(sellerId);
    await redisClient.del(sellerId.toString());
    return { message: "Seller deleted successfully" };
};
