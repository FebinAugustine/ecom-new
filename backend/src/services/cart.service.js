import * as cartRepository from "../repositories/cart.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import ApiError from "../utils/ApiErrors.js";
import redisClient from "../config/redis.js";

const getOrCreateCart = async (userId) => {
  let cart = await cartRepository.findCartByUserId(userId);
  if (!cart) {
    cart = await cartRepository.createCart(userId);
  }
  return cart;
};

export const getCartByUserIdService = async (userId) => {
  const cacheKey = `cart:${userId}`;
  const cachedCart = await redisClient.get(cacheKey);
  if (cachedCart) {
    // It's good practice to wrap this in a try-catch in case of invalid JSON
    try {
      return JSON.parse(cachedCart);
    } catch (e) {
      // If parsing fails, proceed to fetch from DB
    }
  }

  const cart = await getOrCreateCart(userId);

  // --- THIS IS THE CORRECTED LINE ---
  // Use an options object { ex: ... } for expiration
  await redisClient.set(cacheKey, JSON.stringify(cart), { ex: 3600 }); // Cache for 1 hour

  return cart;
};

export const addProductToCartService = async (userId, productId, quantity) => {
  const product = await productRepository.findProductById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.inStock < quantity) {
    throw new ApiError(400, `Only ${product.inStock} items are in stock`);
  }

  const cart = await getOrCreateCart(userId);
  const productIndex = cart.products.findIndex(
    (p) => p.product._id.toString() === productId
  );

  if (productIndex > -1) {
    // Product exists in cart, update quantity
    cart.products[productIndex].quantity += quantity;
  } else {
    // Product does not exist in cart, add new item
    cart.products.push({ product: productId, quantity });
  }

  const updatedCart = await cartRepository.updateCartById(cart._id, {
    products: cart.products,
  });

  // Invalidate cache
  await redisClient.del(`cart:${userId}`);

  return updatedCart;
};

export const updateCartItemQuantityService = async (
  userId,
  productId,
  quantity
) => {
  if (quantity <= 0) {
    return await removeProductFromCartService(userId, productId);
  }

  const cart = await getOrCreateCart(userId);
  const productIndex = cart.products.findIndex(
    (p) => p.product._id.toString() === productId
  );

  if (productIndex === -1) {
    throw new ApiError(404, "Product not found in cart");
  }

  cart.products[productIndex].quantity = quantity;
  const updatedCart = await cartRepository.updateCartById(cart._id, {
    products: cart.products,
  });

  // Invalidate cache
  await redisClient.del(`cart:${userId}`);

  return updatedCart;
};

export const removeProductFromCartService = async (userId, productId) => {
  const cart = await getOrCreateCart(userId);
  const updatedProducts = cart.products.filter(
    (p) => p.product._id.toString() !== productId
  );

  const updatedCart = await cartRepository.updateCartById(cart._id, {
    products: updatedProducts,
  });

  // Invalidate cache
  await redisClient.del(`cart:${userId}`);

  return updatedCart;
};

export const clearCartService = async (userId) => {
  const cart = await getOrCreateCart(userId);
  const updatedCart = await cartRepository.updateCartById(cart._id, {
    products: [],
  });

  // Invalidate cache
  await redisClient.del(`cart:${userId}`);

  return updatedCart;
};
