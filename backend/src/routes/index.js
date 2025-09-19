import express from 'express';
import userRoutes from './user.routes.js';
import sellerRoutes from './seller.routes.js';
import adminRoutes from './admin.routes.js';
import productRoutes from './product.routes.js';
import orderRoutes from './order.routes.js';
import cartRoutes from './cart.routes.js';
import reviewRoutes from './review.routes.js';
import replyRoutes from './reply.routes.js';
import wishlistRoutes from './wishlist.routes.js';
import likeRoutes from './like.routes.js';
import categoryRoutes from './category.routes.js';
import invoiceRoutes from './invoice.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/sellers', sellerRoutes);
router.use('/admins', adminRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/carts', cartRoutes);
router.use('/reviews', reviewRoutes);
router.use('/replies', replyRoutes);
router.use('/wishlists', wishlistRoutes);
router.use('/likes', likeRoutes);
router.use('/categories', categoryRoutes);
router.use('/invoices', invoiceRoutes);

export default router;
