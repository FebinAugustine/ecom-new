import express from 'express';
import {
    registerSeller,
    loginSeller,
    logoutSeller,
    refreshSellerToken,
    getAllSellers,
    getSellerById,
    updateSellerById,
    updateSellerBankDetails,
    updateSellerAvatar,
    updateSellerPassword,
    forgotSellerPassword,
    verifySellerForgotPasswordCode,
    deleteSellerById
} from '../controllers/seller.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// --- PUBLIC SELLER ROUTES ---
router.post('/register', registerSeller);
router.post('/login', loginSeller);
router.post('/refresh-token', refreshSellerToken);
router.post('/forgot-password', forgotSellerPassword);
router.post('/forgot-password-verify-code', verifySellerForgotPasswordCode);

// --- PROTECTED SELLER ROUTES ---
router.post('/logout', verifyToken, logoutSeller);
router.put('/update-password', verifyToken, updateSellerPassword);
router.put('/update-avatar', verifyToken, upload.single('avatar'), updateSellerAvatar);
router.put('/bank/:id', verifyToken, updateSellerBankDetails);

// --- ADMIN-ONLY ROUTES FOR SELLERS ---
router.get('/all-sellers', verifyToken, verifyTokenAndAdmin, getAllSellers);
router.get('/:id', verifyToken, verifyTokenAndAdmin, getSellerById);
router.put('/:id', verifyToken, verifyTokenAndAdmin, updateSellerById);
router.delete('/:id', verifyToken, verifyTokenAndAdmin, deleteSellerById);

export default router;
