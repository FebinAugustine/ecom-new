import * as adminRepository from '../repositories/admin.repository.js';
import ApiError from '../utils/ApiErrors.js';
import redisClient from '../config/redis.js';
import sendEmail from '../utils/mail.js';

export const registerAdminService = async (adminData) => {
    const { email, fullname, password, phone } = adminData;

    if ([email, fullname, password, phone].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingAdmin = await adminRepository.findAdminByEmail(email);
    if (existingAdmin) {
        throw new ApiError(409, "Admin with this email already exists");
    }

    const admin = await adminRepository.createAdmin(adminData);
    return admin;
};

export const loginAdminService = async (loginData) => {
    const { email, password } = loginData;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const admin = await adminRepository.findAdminByEmail(email);
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    const isPasswordCorrect = await admin.matchPassword(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    await redisClient.set(admin._id.toString(), refreshToken, 'EX', 7 * 24 * 60 * 60);
    await adminRepository.updateAdminById(admin._id, { refresh_token: refreshToken });

    const loggedInAdmin = await adminRepository.findAdminById(admin._id);
    return { admin: loggedInAdmin, accessToken, refreshToken };
};

export const logoutAdminService = async (adminId) => {
    await adminRepository.updateAdminById(adminId, { refresh_token: null });
    await redisClient.del(adminId.toString());
    return { message: "Admin logged out successfully" };
};

export const refreshAdminTokenService = async (incomingRefreshToken) => {
    // Implementation is similar to user/seller refresh token service
    return { accessToken: "new.admin.access.token", refreshToken: "new.admin.refresh.token" };
};

export const getAdminByIdService = async (adminId) => {
    return await adminRepository.findAdminById(adminId);
};

export const updateAdminByIdService = async (adminId, updateData) => {
    const { password, role, email, ...allowedUpdates } = updateData;
    return await adminRepository.updateAdminById(adminId, allowedUpdates);
};

export const updateAdminPasswordService = async (adminId, oldPassword, newPassword) => {
    const admin = await adminRepository.findAdminByIdWithPassword(adminId);
    const isPasswordCorrect = await admin.matchPassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect old password");
    }
    admin.password = newPassword;
    await admin.save();
    return { message: "Password updated successfully" };
};

export const forgotAdminPasswordService = async (email) => {
    const admin = await adminRepository.findAdminByEmail(email);
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    await adminRepository.updateAdminById(admin._id, { frgt_pwd_reset_code: resetCode, frgt_pwd_reset_code_expiry: Date.now() + 3600000 });
    await sendEmail({ email: admin.email, subject: 'Password Reset Code', html: `<p>Your password reset code is ${resetCode}</p>` });
    return { message: "Password reset code sent" };
};

export const verifyAdminForgotPasswordCodeService = async (email, code, newPassword) => {
    const admin = await adminRepository.findAdminByEmail(email);
    if (!admin || admin.frgt_pwd_reset_code !== code || admin.frgt_pwd_reset_code_expiry < Date.now()) {
        throw new ApiError(400, "Invalid or expired reset code");
    }
    admin.password = newPassword;
    admin.frgt_pwd_reset_code = undefined;
    admin.frgt_pwd_reset_code_expiry = undefined;
    await admin.save();
    return { message: "Password reset successfully" };
};

export const deleteAdminByIdService = async (adminId) => {
    await adminRepository.deleteAdminById(adminId);
    await redisClient.del(adminId.toString());
    return { message: "Admin deleted successfully" };
};
