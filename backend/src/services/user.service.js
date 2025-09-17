import * as userRepository from '../repositories/user.repository.js';
import ApiError from '../utils/ApiErrors.js';
import { redisClient } from '../config/redis.js';
import jwt from 'jsonwebtoken';
import { uploadOnCloudinary, deleteImageFromCloudinary } from '../utils/cloudinary.fileuplaod.js';
import sendEmail from '../utils/mail.js';

export const registerUserService = async (userData) => {
    const { email, fullname, password, phone } = userData;

    if ([email, fullname, password, phone].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const user = await userRepository.createUser({ email, fullname, password, phone });

    // For now, returning the user object. Token generation will be handled in login.
    return user;
};

export const loginUserService = async (loginData) => {
    const { email, password } = loginData;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Store refresh token in Redis
    await redisClient.set(user._id.toString(), refreshToken, 'EX', 7 * 24 * 60 * 60); // 7 days expiry

    user.refresh_token = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await userRepository.findUserById(user._id);

    return { user: loggedInUser, accessToken, refreshToken };
};

export const googleOAuthService = async (user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Store refresh token in Redis
    await redisClient.set(user._id.toString(), refreshToken, 'EX', 7 * 24 * 60 * 60); // 7 days expiry

    await userRepository.updateUserById(user._id, { refresh_token: refreshToken });

    const loggedInUser = await userRepository.findUserById(user._id);

    return { user: loggedInUser, accessToken, refreshToken };
};

export const logoutUserService = async (userId) => {
    await userRepository.updateUserById(userId, { refresh_token: null });
    await redisClient.del(userId.toString());
    return { message: "User logged out successfully" };
};

export const refreshAccessTokenService = async (incomingRefreshToken) => {
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request: No refresh token provided");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await userRepository.findUserById(decodedToken?._id);
    if (!user) {
        throw new ApiError(401, "Invalid Refresh Token: User not found");
    }

    const redisToken = await redisClient.get(user._id.toString());
    if (!redisToken || incomingRefreshToken !== redisToken) {
        throw new ApiError(401, "Invalid or expired refresh token. Please log in again.");
    }

    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    // Update refresh token in Redis and DB
    await redisClient.set(user._id.toString(), newRefreshToken, 'EX', 7 * 24 * 60 * 60);
    await userRepository.updateUserById(user._id, { refresh_token: newRefreshToken });

    return { accessToken, refreshToken: newRefreshToken };
};

export const getAllUsersService = async () => {
    const cachedUsers = await redisClient.get('allUsers');
    if (cachedUsers) {
        return JSON.parse(cachedUsers);
    }

    const users = await userRepository.getAllUsers();
    await redisClient.set('allUsers', JSON.stringify(users), 'EX', 3600); // Cache for 1 hour
    return users;
};

export const getUserByIdService = async (userId) => {
    const cachedUser = await redisClient.get(`user:${userId}`);
    if (cachedUser) {
        return JSON.parse(cachedUser);
    }

    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await redisClient.set(`user:${userId}`, JSON.stringify(user), 'EX', 3600); // Cache for 1 hour
    return user;
};

export const getUserByEmailService = async (email) => {
    const cachedUser = await redisClient.get(`user:${email}`);
    if (cachedUser) {
        return JSON.parse(cachedUser);
    }

    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await redisClient.set(`user:${email}`, JSON.stringify(user), 'EX', 3600); // Cache for 1 hour
    return user;
};

export const updateUserPasswordService = async (userId, oldPassword, newPassword) => {
    const user = await userRepository.findUserByIdWithPassword(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.matchPassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect old password");
    }

    user.password = newPassword;
    await user.save();

    // Invalidate user cache
    await redisClient.del(`user:${userId}`);

    return { message: "Password updated successfully" };
};

export const updateUserByIdService = async (userId, updateData) => {
    // Prevent sensitive fields from being updated through this service
    const { password, role, email, ...allowedUpdates } = updateData;

    const updatedUser = await userRepository.updateUserById(userId, allowedUpdates);

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    // Invalidate caches
    await redisClient.del(`user:${userId}`);
    await redisClient.del('allUsers');

    return updatedUser;
};

export const updateUserAvatarService = async (userId, avatarLocalPath) => {
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const oldAvatarUrl = user.image;

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar || !avatar.url) {
        throw new ApiError(500, "Error uploading avatar to Cloudinary");
    }

    const updatedUser = await userRepository.updateUserById(userId, { image: avatar.url });

    if (oldAvatarUrl) {
        try {
            const publicId = oldAvatarUrl.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(publicId);
        } catch (error) {
            console.error("Error deleting old avatar from Cloudinary:", error);
        }
    }

    // Invalidate caches
    await redisClient.del(`user:${userId}`);
    await redisClient.del('allUsers');

    return updatedUser;
};

export const forgotPasswordService = async (email) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new ApiError(404, "User with this email does not exist.");
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await userRepository.updateUserById(user._id, {
        frgt_pwd_reset_code: resetCode,
        frgt_pwd_reset_code_expiry: resetCodeExpiry,
    });

    const message = `Your password reset code is: ${resetCode}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Code',
            html: message,
        });
        return { message: "Password reset code sent to your email." };
    } catch (error) {
        // If email fails, clear the reset code from DB to allow a retry
        await userRepository.updateUserById(user._id, {
            frgt_pwd_reset_code: null,
            frgt_pwd_reset_code_expiry: null,
        });
        throw new ApiError(500, "There was an error sending the email. Please try again.");
    }
};

export const forgotPasswordVerifyCodeService = async (email, code, newPassword) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isCodeValid = user.frgt_pwd_reset_code === code;
    const isCodeExpired = new Date() > new Date(user.frgt_pwd_reset_code_expiry);

    if (!isCodeValid || isCodeExpired) {
        throw new ApiError(400, "Invalid or expired password reset code.");
    }

    user.password = newPassword;
    user.frgt_pwd_reset_code = null;
    user.frgt_pwd_reset_code_expiry = null;
    await user.save();

    // Invalidate user cache
    await redisClient.del(`user:${user._id}`);

    return { message: "Password has been reset successfully." };
};

export const resendVerificationEmailService = async (email) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.is_verified) {
        throw new ApiError(400, "This email is already verified.");
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await userRepository.updateUserById(user._id, {
        email_verification_code: verificationCode,
        email_verification_code_expiry: verificationCodeExpiry,
    });

    const message = `Your email verification code is: ${verificationCode}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Email Verification Code',
            html: message,
        });
        return { message: "Verification code sent to your email." };
    } catch (error) {
        await userRepository.updateUserById(user._id, {
            email_verification_code: null,
            email_verification_code_expiry: null,
        });
        throw new ApiError(500, "There was an error sending the email. Please try again.");
    }
};

export const verifyEmailService = async (email, code) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isCodeValid = user.email_verification_code === code;
    const isCodeExpired = new Date() > new Date(user.email_verification_code_expiry);

    if (!isCodeValid || isCodeExpired) {
        throw new ApiError(400, "Invalid or expired verification code.");
    }

    await userRepository.updateUserById(user._id, {
        is_verified: true,
        email_verification_code: null,
        email_verification_code_expiry: null,
    });

    // Invalidate user cache
    await redisClient.del(`user:${user._id}`);
    await redisClient.del('allUsers');

    return { message: "Email verified successfully." };
};

export const deleteUserByIdService = async (userId) => {
    const deletedUser = await userRepository.deleteUserById(userId);
    if (!deletedUser) {
        throw new ApiError(404, "User not found");
    }

    // Invalidate caches
    await redisClient.del(userId.toString()); // For refresh token
    await redisClient.del(`user:${userId}`); // For user data cache
    await redisClient.del('allUsers'); // For all users cache

    return { message: "User deleted successfully" };
};
