import User from '../models/user.model.js';

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const findUserByEmail = async (email) => {
    return await User.findOne({ email }).select("-password -refresh_token");
};

export const findUserByGoogleId = async (googleId) => {
    return await User.findOne({ googleId }).select("-password -refresh_token");
};

export const findUserById = async (id) => {
    return await User.findById(id).select("-password -refresh_token");
};

export const findUserByIdWithPassword = async (id) => {
    return await User.findById(id);
};

export const updateUserById = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const getAllUsers = async () => {
    return await User.find({}).select("-password -refresh_token");
};

export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};
