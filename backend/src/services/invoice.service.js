import * as invoiceRepository from '../repositories/invoice.repository.js';
import * as orderRepository from '../repositories/order.repository.js';
import ApiError from '../utils/ApiErrors.js';
import redisClient from '../config/redis.js';

export const createInvoiceService = async (orderId) => {
    const order = await orderRepository.findOrderById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    const { user, seller, totalAmount, deliveryAddress, paymentMethod, paymentStatus, orderStatus } = order;

    const invoiceData = {
        order: orderId,
        user,
        seller,
        total: totalAmount,
        deliveryAddress,
        paymentMethod,
        paymentStatus,
        status: orderStatus,
    };

    const newInvoice = await invoiceRepository.createInvoice(invoiceData);

    // Invalidate invoice caches
    await redisClient.del('allInvoices');

    return newInvoice;
};

export const getAllInvoicesService = async (queryParams) => {
    const { user, seller, sort, page, limit } = queryParams;
    const filters = {};
    if (user) filters.user = user;
    if (seller) filters.seller = seller;

    const sortOptions = sort ? { [sort.split(':')[0]]: sort.split(':')[1] === 'desc' ? -1 : 1 } : { createdAt: -1 };

    const cacheKey = `invoices:${JSON.stringify(filters)}:${JSON.stringify(sortOptions)}:${page}:${limit}`;
    const cachedInvoices = await redisClient.get(cacheKey);
    if (cachedInvoices) {
        return JSON.parse(cachedInvoices);
    }

    const invoices = await invoiceRepository.getAllInvoices(filters, sortOptions, page, limit);
    await redisClient.set(cacheKey, JSON.stringify(invoices), 'EX', 3600); // Cache for 1 hour
    return invoices;
};

export const getInvoiceByIdService = async (invoiceId) => {
    const cacheKey = `invoice:${invoiceId}`;
    const cachedInvoice = await redisClient.get(cacheKey);
    if (cachedInvoice) {
        return JSON.parse(cachedInvoice);
    }

    const invoice = await invoiceRepository.findInvoiceById(invoiceId);
    if (!invoice) {
        throw new ApiError(404, "Invoice not found");
    }

    await redisClient.set(cacheKey, JSON.stringify(invoice), 'EX', 3600);
    return invoice;
};

export const updateInvoiceByIdService = async (invoiceId, updateData) => {
    const updatedInvoice = await invoiceRepository.updateInvoiceById(invoiceId, updateData);
    if (!updatedInvoice) {
        throw new ApiError(404, "Invoice not found");
    }

    // Invalidate caches
    await redisClient.del(`invoice:${invoiceId}`);
    await redisClient.del('allInvoices');

    return updatedInvoice;
};

export const deleteInvoiceByIdService = async (invoiceId) => {
    const deletedInvoice = await invoiceRepository.deleteInvoiceById(invoiceId);
    if (!deletedInvoice) {
        throw new ApiError(404, "Invoice not found");
    }

    // Invalidate caches
    await redisClient.del(`invoice:${invoiceId}`);
    await redisClient.del('allInvoices');

    return { message: "Invoice deleted successfully" };
};
