import express from 'express';
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAdminToken,
    getAdminById,
    updateAdminById,
    updateAdminPassword,
    forgotAdminPassword,
    verifyAdminForgotPasswordCode,
    deleteAdminById
} from '../controllers/admin.controller.js';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// --- PUBLIC ADMIN ROUTES ---
// Note: In a real-world scenario, admin registration should be a protected, internal process.
// For this project, it is left as a public route for simplicity.
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/refresh-token', refreshAdminToken);
router.post('/forgot-password', forgotAdminPassword);
router.post('/forgot-password-verify-code', verifyAdminForgotPasswordCode);

// --- PROTECTED ADMIN ROUTES (require admin role) ---
router.use(verifyToken, verifyTokenAndAdmin);

router.post('/logout', logoutAdmin);
router.get('/:id', getAdminById);
router.put('/:id', updateAdminById);
router.put('/update-password', updateAdminPassword);
router.delete('/:id', deleteAdminById);

export default router;
