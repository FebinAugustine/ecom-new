import Invoice from '../models/invoice.model.js';

export const createInvoice = async (invoiceData) => {
    const invoice = new Invoice(invoiceData);
    return await invoice.save();
};

export const findInvoiceById = async (id) => {
    return await Invoice.findById(id).populate('user', 'fullname email').populate('seller', 'fullname email company_name').populate('order');
};

export const getAllInvoices = async (filters = {}, sort = { createdAt: -1 }, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const invoices = await Invoice.find(filters)
        .populate('user', 'fullname email')
        .populate('seller', 'fullname email company_name')
        .populate('order')
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const totalInvoices = await Invoice.countDocuments(filters);
    return { invoices, totalInvoices, page, totalPages: Math.ceil(totalInvoices / limit) };
};

export const updateInvoiceById = async (id, updateData) => {
    return await Invoice.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const deleteInvoiceById = async (id) => {
    return await Invoice.findByIdAndDelete(id);
};
