import * as likeRepository from '../repositories/like.repository.js';
import * as productRepository from '../repositories/product.repository.js';
import ApiError from '../utils/ApiErrors.js';
import redisClient from '../config/redis.js';

const getOrCreateLike = async (userId) => {
    let like = await likeRepository.findLikeByUserId(userId);
    if (!like) {
        like = await likeRepository.createLike(userId);
    }
    return like;
};

export const getLikeByUserIdService = async (userId) => {
    const cacheKey = `like:${userId}`;
    const cachedLike = await redisClient.get(cacheKey);
    if (cachedLike) {
        return JSON.parse(cachedLike);
    }

    const like = await getOrCreateLike(userId);
    await redisClient.set(cacheKey, JSON.stringify(like), 'EX', 3600); // Cache for 1 hour
    return like;
};

export const addProductToLikeService = async (userId, productId) => {
    const product = await productRepository.findProductById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const like = await getOrCreateLike(userId);
    const productIndex = like.products.findIndex(p => p._id.toString() === productId);

    if (productIndex === -1) {
        like.products.push(productId);
    }

    const updatedLike = await likeRepository.updateLikeById(like._id, { products: like.products });

    // Invalidate cache
    await redisClient.del(`like:${userId}`);

    return updatedLike;
};

export const removeProductFromLikeService = async (userId, productId) => {
    const like = await getOrCreateLike(userId);
    const updatedProducts = like.products.filter(p => p._id.toString() !== productId);

    const updatedLike = await likeRepository.updateLikeById(like._id, { products: updatedProducts });

    // Invalidate cache
    await redisClient.del(`like:${userId}`);

    return updatedLike;
};
