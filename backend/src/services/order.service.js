import * as orderRepository from '../repositories/order.repository.js';
import * as productRepository from '../repositories/product.repository.js';
import ApiError from '../utils/ApiErrors.js';
import redisClient from '../config/redis.js';

export const createOrderService = async (orderData, userId) => {
    const { products, seller, deliveryAddress, paymentMethod } = orderData;

    if (!products || products.length === 0) {
        throw new ApiError(400, "Order must contain at least one product");
    }

    let totalAmount = 0;
    const productSnapshots = [];

    for (const item of products) {
        const product = await productRepository.findProductById(item.productId);
        if (!product) {
            throw new ApiError(404, `Product with id ${item.productId} not found`);
        }
        if (product.inStock < item.quantity) {
            throw new ApiError(400, `Not enough stock for ${product.name}`);
        }

        // Decrement stock
        product.inStock -= item.quantity;
        await product.save();

        totalAmount += product.price * item.quantity;
        productSnapshots.push({ product: product.toObject(), quantity: item.quantity, price: product.price });
    }

    const newOrder = await orderRepository.createOrder({
        user: userId,
        seller,
        products: productSnapshots,
        totalAmount,
        deliveryAddress,
        paymentMethod,
    });

    // Invalidate product and order caches
    await redisClient.del('allProducts');
    await redisClient.del('allOrders');

    return newOrder;
};

export const getAllOrdersService = async (queryParams) => {
    const { user, seller, sort, page, limit } = queryParams;
    const filters = {};
    if (user) filters.user = user;
    if (seller) filters.seller = seller;

    const sortOptions = sort ? { [sort.split(':')[0]]: sort.split(':')[1] === 'desc' ? -1 : 1 } : { createdAt: -1 };

    const cacheKey = `orders:${JSON.stringify(filters)}:${JSON.stringify(sortOptions)}:${page}:${limit}`;
    const cachedOrders = await redisClient.get(cacheKey);
    if (cachedOrders) {
        return JSON.parse(cachedOrders);
    }

    const orders = await orderRepository.getAllOrders(filters, sortOptions, page, limit);
    await redisClient.set(cacheKey, JSON.stringify(orders), 'EX', 3600); // Cache for 1 hour
    return orders;
};

export const getOrderByIdService = async (orderId) => {
    const cacheKey = `order:${orderId}`;
    const cachedOrder = await redisClient.get(cacheKey);
    if (cachedOrder) {
        return JSON.parse(cachedOrder);
    }

    const order = await orderRepository.findOrderById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    await redisClient.set(cacheKey, JSON.stringify(order), 'EX', 3600);
    return order;
};

export const getOrdersByUserService = async (userId) => {
    return await orderRepository.getOrdersByUserId(userId);
};

export const getOrdersBySellerService = async (sellerId) => {
    return await orderRepository.getOrdersBySellerId(sellerId);
};

export const updateOrderByIdService = async (orderId, updateData) => {
    const updatedOrder = await orderRepository.updateOrderById(orderId, updateData);
    if (!updatedOrder) {
        throw new ApiError(404, "Order not found");
    }

    // Invalidate caches
    await redisClient.del(`order:${orderId}`);
    await redisClient.del('allOrders');

    return updatedOrder;
};

export const deleteOrderByIdService = async (orderId) => {
    const deletedOrder = await orderRepository.deleteOrderById(orderId);
    if (!deletedOrder) {
        throw new ApiError(404, "Order not found");
    }

    // Invalidate caches
    await redisClient.del(`order:${orderId}`);
    await redisClient.del('allOrders');

    return { message: "Order deleted successfully" };
};
