import Like from '../models/like.model.js';

export const findLikeByUserId = async (userId) => {
    return await Like.findOne({ user: userId }).populate('products');
};

export const createLike = async (userId) => {
    const like = new Like({ user: userId, products: [] });
    return await like.save();
};

export const updateLikeById = async (likeId, updateData) => {
    return await Like.findByIdAndUpdate(likeId, updateData, { new: true }).populate('products');
};
