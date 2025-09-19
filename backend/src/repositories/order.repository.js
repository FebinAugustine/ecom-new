import Order from '../models/order.model.js';

export const createOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

export const findOrderById = async (id) => {
    return await Order.findById(id).populate('user', 'fullname email').populate('seller', 'fullname email company_name');
};

export const getAllOrders = async (filters = {}, sort = { createdAt: -1 }, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const orders = await Order.find(filters)
        .populate('user', 'fullname email')
        .populate('seller', 'fullname email company_name')
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const totalOrders = await Order.countDocuments(filters);
    return { orders, totalOrders, page, totalPages: Math.ceil(totalOrders / limit) };
};

export const getOrdersByUserId = async (userId) => {
    return await Order.find({ user: userId }).populate('seller', 'fullname email company_name');
};

export const getOrdersBySellerId = async (sellerId) => {
    return await Order.find({ seller: sellerId }).populate('user', 'fullname email');
};

export const updateOrderById = async (id, updateData) => {
    return await Order.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const deleteOrderById = async (id) => {
    return await Order.findByIdAndDelete(id);
};
