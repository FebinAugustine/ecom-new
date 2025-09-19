import express from 'express';
import {
    getWishlist,
    addProductToWishlist,
    removeProductFromWishlist
} from '../controllers/wishlist.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All wishlist routes are protected and require a logged-in user
router.use(verifyToken);

router.get('/', getWishlist);
router.post('/', addProductToWishlist);
router.delete('/:productId', removeProductFromWishlist);

export default router;
