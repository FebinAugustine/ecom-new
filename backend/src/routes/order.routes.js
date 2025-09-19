import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    getOrdersBySellerId,
    updateOrderById,
    deleteOrderById
} from '../controllers/order.controller.js';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All order routes are protected, as they deal with sensitive user and seller data.
router.use(verifyToken);

// --- USER-ACCESSIBLE ROUTES ---
router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUserId); // A user can get their own orders

// --- SELLER-ACCESSIBLE ROUTES ---
router.get('/seller/:sellerId', getOrdersBySellerId); // A seller can get their own orders

// --- ADMIN-ONLY ROUTES ---
router.get('/', verifyTokenAndAdmin, getAllOrders); // Admins can get all orders
router.get('/:id', getOrderById); // A user/seller can get their own order, or an admin can get any
router.put('/:id', verifyTokenAndAdmin, updateOrderById); // Only admins can update order status/details
router.delete('/:id', verifyTokenAndAdmin, deleteOrderById); // Only admins can delete orders

export default router;
