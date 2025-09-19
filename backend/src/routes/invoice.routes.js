import express from 'express';
import {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoiceById,
    deleteInvoiceById
} from '../controllers/invoice.controller.js';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All invoice routes are protected
router.use(verifyToken);

// --- USER/SELLER ACCESSIBLE ROUTES ---
// A user or seller can get a specific invoice they are a part of.
// The authorization logic for this would exist in the service layer.
router.get('/:id', getInvoiceById);

// --- ADMIN-ONLY ROUTES ---
router.post('/', verifyTokenAndAdmin, createInvoice);
router.get('/', verifyTokenAndAdmin, getAllInvoices);
router.put('/:id', verifyTokenAndAdmin, updateInvoiceById);
router.delete('/:id', verifyTokenAndAdmin, deleteInvoiceById);

export default router;
