import express from 'express';
import {
    createReply,
    getRepliesByReviewId,
    updateReplyById,
    deleteReplyById
} from '../controllers/reply.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// --- PUBLIC ROUTE ---
router.get('/review/:reviewId', getRepliesByReviewId);

// --- PROTECTED ROUTES ---
router.use(verifyToken);

router.post('/', createReply);
router.put('/:id', updateReplyById);
router.delete('/:id', deleteReplyById);

export default router;
