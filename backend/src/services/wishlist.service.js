import * as wishlistRepository from "../repositories/wishlist.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import ApiError from "../utils/ApiErrors.js";
import redisClient from "../config/redis.js";

const getOrCreateWishlist = async (userId) => {
  let wishlist = await wishlistRepository.findWishlistByUserId(userId);
  if (!wishlist) {
    wishlist = await wishlistRepository.createWishlist(userId);
  }
  return wishlist;
};

export const getWishlistByUserIdService = async (userId) => {
  const cacheKey = `wishlist:${userId}`;
  const cachedWishlist = await redisClient.get(cacheKey);
  if (cachedWishlist) {
    try {
      return JSON.parse(cachedWishlist);
    } catch (e) {
      // If parsing fails, proceed to fetch from DB
    }
  }

  const wishlist = await getOrCreateWishlist(userId);

  // --- THIS IS THE CORRECTED LINE ---
  // Use an options object { ex: ... } for expiration
  await redisClient.set(cacheKey, JSON.stringify(wishlist), { ex: 3600 }); // Cache for 1 hour

  return wishlist;
};

export const addProductToWishlistService = async (userId, productId) => {
  const product = await productRepository.findProductById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const wishlist = await getOrCreateWishlist(userId);
  const productIndex = wishlist.products.findIndex(
    (p) => p._id.toString() === productId
  );

  if (productIndex === -1) {
    wishlist.products.push(productId);
  }

  const updatedWishlist = await wishlistRepository.updateWishlistById(
    wishlist._id,
    { products: wishlist.products }
  );

  // Invalidate cache
  await redisClient.del(`wishlist:${userId}`);

  return updatedWishlist;
};

export const removeProductFromWishlistService = async (userId, productId) => {
  const wishlist = await getOrCreateWishlist(userId);
  const updatedProducts = wishlist.products.filter(
    (p) => p._id.toString() !== productId
  );

  const updatedWishlist = await wishlistRepository.updateWishlistById(
    wishlist._id,
    { products: updatedProducts }
  );

  // Invalidate cache
  await redisClient.del(`wishlist:${userId}`);

  return updatedWishlist;
};
