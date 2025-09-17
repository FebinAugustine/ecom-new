import Admin from '../models/admin.model.js';

export const createAdmin = async (adminData) => {
    const admin = new Admin(adminData);
    return await admin.save();
};

export const findAdminByEmail = async (email) => {
    return await Admin.findOne({ email });
};

export const findAdminById = async (id) => {
    return await Admin.findById(id).select("-password -refresh_token");
};

export const findAdminByIdWithPassword = async (id) => {
    return await Admin.findById(id);
};

export const updateAdminById = async (id, updateData) => {
    return await Admin.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const getAllAdmins = async () => {
    return await Admin.find({}).select("-password -refresh_token");
};

export const deleteAdminById = async (id) => {
    return await Admin.findByIdAndDelete(id);
};
