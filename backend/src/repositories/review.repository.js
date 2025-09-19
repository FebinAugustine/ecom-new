import Review from '../models/review.model.js';

export const createReview = async (reviewData) => {
    const review = new Review(reviewData);
    return await review.save();
};

export const findReviewById = async (id) => {
    return await Review.findById(id).populate('user', 'fullname email').populate('product', 'name');
};

export const getAllReviews = async (filters = {}, sort = { createdAt: -1 }, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const reviews = await Review.find(filters)
        .populate('user', 'fullname email')
        .populate('product', 'name')
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const totalReviews = await Review.countDocuments(filters);
    return { reviews, totalReviews, page, totalPages: Math.ceil(totalReviews / limit) };
};

export const getReviewsByProductId = async (productId) => {
    return await Review.find({ product: productId }).populate('user', 'fullname email');
};

export const updateReviewById = async (id, updateData) => {
    return await Review.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const deleteReviewById = async (id) => {
    return await Review.findByIdAndDelete(id);
};
