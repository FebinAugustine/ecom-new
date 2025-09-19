import * as reviewRepository from '../repositories/review.repository.js';
import * as productRepository from '../repositories/product.repository.js';
import ApiError from '../utils/ApiErrors.js';
import redisClient from '../config/redis.js';

export const createReviewService = async (reviewData, userId) => {
    const { product, rating, review } = reviewData;

    if (!product || !rating || !review) {
        throw new ApiError(400, "Product, rating, and review are required");
    }

    const newReview = await reviewRepository.createReview({ ...reviewData, user: userId });

    // Add the review to the product's reviews array
    const productToUpdate = await productRepository.findProductById(product);
    productToUpdate.reviews.push(newReview._id);
    await productToUpdate.save();

    // Invalidate caches
    await redisClient.del(`reviews:${product}`);
    await redisClient.del('allReviews');

    return newReview;
};

export const getAllReviewsService = async (queryParams) => {
    const { product, user, sort, page, limit } = queryParams;
    const filters = {};
    if (product) filters.product = product;
    if (user) filters.user = user;

    const sortOptions = sort ? { [sort.split(':')[0]]: sort.split(':')[1] === 'desc' ? -1 : 1 } : { createdAt: -1 };

    const cacheKey = `reviews:${JSON.stringify(filters)}:${JSON.stringify(sortOptions)}:${page}:${limit}`;
    const cachedReviews = await redisClient.get(cacheKey);
    if (cachedReviews) {
        return JSON.parse(cachedReviews);
    }

    const reviews = await reviewRepository.getAllReviews(filters, sortOptions, page, limit);
    await redisClient.set(cacheKey, JSON.stringify(reviews), 'EX', 3600); // Cache for 1 hour
    return reviews;
};

export const getReviewByIdService = async (reviewId) => {
    const cacheKey = `review:${reviewId}`;
    const cachedReview = await redisClient.get(cacheKey);
    if (cachedReview) {
        return JSON.parse(cachedReview);
    }

    const review = await reviewRepository.findReviewById(reviewId);
    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    await redisClient.set(cacheKey, JSON.stringify(review), 'EX', 3600);
    return review;
};

export const getReviewsByProductIdService = async (productId) => {
    const cacheKey = `reviews:${productId}`;
    const cachedReviews = await redisClient.get(cacheKey);
    if (cachedReviews) {
        return JSON.parse(cachedReviews);
    }

    const reviews = await reviewRepository.getReviewsByProductId(productId);
    await redisClient.set(cacheKey, JSON.stringify(reviews), 'EX', 3600);
    return reviews;
};

export const updateReviewByIdService = async (reviewId, updateData) => {
    const updatedReview = await reviewRepository.updateReviewById(reviewId, updateData);
    if (!updatedReview) {
        throw new ApiError(404, "Review not found");
    }

    // Invalidate caches
    await redisClient.del(`review:${reviewId}`);
    await redisClient.del(`reviews:${updatedReview.product}`);
    await redisClient.del('allReviews');

    return updatedReview;
};

export const deleteReviewByIdService = async (reviewId) => {
    const review = await reviewRepository.findReviewById(reviewId);
    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    // Remove the review from the product's reviews array
    const product = await productRepository.findProductById(review.product);
    if (product) {
        product.reviews.pull(review._id);
        await product.save();
    }

    await reviewRepository.deleteReviewById(reviewId);

    // Invalidate caches
    await redisClient.del(`review:${reviewId}`);
    await redisClient.del(`reviews:${review.product}`);
    await redisClient.del('allReviews');

    return { message: "Review deleted successfully" };
};
