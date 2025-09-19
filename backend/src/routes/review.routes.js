import express from 'express';
import {
    createReview,
    getAllReviews,
    getReviewById,
    getReviewsByProductId,
    updateReviewById,
    deleteReviewById
} from '../controllers/review.controller.js';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// --- PUBLIC ROUTES ---
router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.get('/product/:productId', getReviewsByProductId);

// --- PROTECTED ROUTES ---
router.post('/', verifyToken, createReview);
router.put('/:id', verifyToken, updateReviewById);
router.delete('/:id', verifyToken, deleteReviewById);

export default router;
