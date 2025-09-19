import Wishlist from "../models/wishlist.model.js";

export const findWishlistByUserId = async (userId) => {
  return await Wishlist.findOne({ user: userId }).populate("products");
};

export const createWishlist = async (userId) => {
  const wishlist = new Wishlist({ user: userId, products: [] });
  return await wishlist.save();
};

export const updateWishlistById = async (wishlistId, updateData) => {
  return await Wishlist.findByIdAndUpdate(wishlistId, updateData, {
    new: true,
  }).populate("products");
};
