import express from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} from '../controllers/category.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// --- PUBLIC ROUTES ---
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// --- ADMIN-ONLY ROUTES ---
router.post('/', verifyToken, verifyTokenAndAdmin, upload.single('image'), createCategory);
router.put('/:id', verifyToken, verifyTokenAndAdmin, upload.single('image'), updateCategoryById);
router.delete('/:id', verifyToken, verifyTokenAndAdmin, deleteCategoryById);

export default router;
