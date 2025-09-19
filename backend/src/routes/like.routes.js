import express from 'express';
import {
    getLikedProducts,
    addProductToLikes,
    removeProductFromLikes
} from '../controllers/like.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All like routes are protected and require a logged-in user
router.use(verifyToken);

router.get('/', getLikedProducts);
router.post('/', addProductToLikes);
router.delete('/:productId', removeProductFromLikes);

export default router;
