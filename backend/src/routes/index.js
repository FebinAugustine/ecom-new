import express from 'express';
import userRoutes from './user.routes.js';
import sellerRoutes from './seller.routes.js';
import adminRoutes from './admin.routes.js';
import productRoutes from './product.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/sellers', sellerRoutes);
router.use('/admins', adminRoutes);
router.use('/products', productRoutes);

export default router;
