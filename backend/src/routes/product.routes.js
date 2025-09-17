import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getProductsBySeller,
    updateProductById,
    updateProductImages,
    deleteProductById
} from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// --- PUBLIC ROUTES ---
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);
router.get('/seller/:id', getProductsBySeller);

// --- PROTECTED ROUTES (require seller or admin role) ---
// Note: For a real application, you might want a more granular authorization middleware 
// that checks if the seller owns the product before allowing updates/deletes.
// For now, we'll use a generic verifyToken and assume logic is in the service.

router.post('/add-products', verifyToken, upload.array('images', 5), createProduct);
router.put('/:id', verifyToken, updateProductById);
router.put('/update-images/:id', verifyToken, upload.array('images', 5), updateProductImages);
router.delete('/:id', verifyToken, deleteProductById);

export default router;
