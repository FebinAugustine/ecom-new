import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as invoiceService from '../services/invoice.service.js';

const createInvoice = asyncHandler(async (req, res) => {
    const { orderId } = req.body;
    const invoice = await invoiceService.createInvoiceService(orderId);
    return res.status(201).json(new ApiResponse(201, invoice, "Invoice created successfully"));
});

const getAllInvoices = asyncHandler(async (req, res) => {
    const result = await invoiceService.getAllInvoicesService(req.query);
    return res.status(200).json(new ApiResponse(200, result, "Invoices retrieved successfully"));
});

const getInvoiceById = asyncHandler(async (req, res) => {
    const invoice = await invoiceService.getInvoiceByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, invoice, "Invoice retrieved successfully"));
});

const updateInvoiceById = asyncHandler(async (req, res) => {
    const updatedInvoice = await invoiceService.updateInvoiceByIdService(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, updatedInvoice, "Invoice updated successfully"));
});

const deleteInvoiceById = asyncHandler(async (req, res) => {
    const result = await invoiceService.deleteInvoiceByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, result, "Invoice deleted successfully"));
});

export {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoiceById,
    deleteInvoiceById
};
