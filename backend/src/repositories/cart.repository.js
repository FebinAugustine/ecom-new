import Cart from '../models/cart.model.js';

export const findCartByUserId = async (userId) => {
    return await Cart.findOne({ user: userId }).populate('products.product');
};

export const createCart = async (userId) => {
    const cart = new Cart({ user: userId, products: [] });
    return await cart.save();
};

export const updateCartById = async (cartId, updateData) => {
    return await Cart.findByIdAndUpdate(cartId, updateData, { new: true }).populate('products.product');
};

export const deleteCartById = async (cartId) => {
    return await Cart.findByIdAndDelete(cartId);
};
