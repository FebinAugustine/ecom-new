import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as orderService from '../services/order.service.js';

const createOrder = asyncHandler(async (req, res) => {
    const order = await orderService.createOrderService(req.body, req.user._id);
    return res.status(201).json(new ApiResponse(201, order, "Order created successfully"));
});

const getAllOrders = asyncHandler(async (req, res) => {
    const result = await orderService.getAllOrdersService(req.query);
    return res.status(200).json(new ApiResponse(200, result, "Orders retrieved successfully"));
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await orderService.getOrderByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, order, "Order retrieved successfully"));
});

const getOrdersByUserId = asyncHandler(async (req, res) => {
    const orders = await orderService.getOrdersByUserService(req.params.userId);
    return res.status(200).json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

const getOrdersBySellerId = asyncHandler(async (req, res) => {
    const orders = await orderService.getOrdersBySellerService(req.params.sellerId);
    return res.status(200).json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

const updateOrderById = asyncHandler(async (req, res) => {
    const updatedOrder = await orderService.updateOrderByIdService(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, updatedOrder, "Order updated successfully"));
});

const deleteOrderById = asyncHandler(async (req, res) => {
    const result = await orderService.deleteOrderByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, result, "Order deleted successfully"));
});

export {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    getOrdersBySellerId,
    updateOrderById,
    deleteOrderById
};
