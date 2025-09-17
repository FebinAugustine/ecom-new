import Seller from '../models/seller.model.js';

export const createSeller = async (sellerData) => {
    const seller = new Seller(sellerData);
    return await seller.save();
};

export const findSellerByEmail = async (email) => {
    return await Seller.findOne({ email });
};

export const findSellerById = async (id) => {
    return await Seller.findById(id).select("-password -refresh_token");
};

export const findSellerByIdWithPassword = async (id) => {
    return await Seller.findById(id);
};

export const updateUserById = async (id, updateData) => {
    return await Seller.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const getAllSellers = async () => {
    return await Seller.find({}).select("-password -refresh_token");
};

export const deleteSellerById = async (id) => {
    return await Seller.findByIdAndDelete(id);
};
