import Product from '../models/product.model.js';

export const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

export const findProductById = async (id) => {
    return await Product.findById(id).populate('seller', 'fullname email company_name');
};

export const getAllProducts = async (filters = {}, sort = { createdAt: -1 }, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const products = await Product.find(filters)
        .populate('seller', 'fullname email company_name')
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const totalProducts = await Product.countDocuments(filters);
    return { products, totalProducts, page, totalPages: Math.ceil(totalProducts / limit) };
};

export const getProductsByCategory = async (category) => {
    return await Product.find({ category }).populate('seller', 'fullname email company_name');
};

export const getProductsBySeller = async (sellerId) => {
    return await Product.find({ seller: sellerId }).populate('seller', 'fullname email company_name');
};

export const updateProductById = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const deleteProductById = async (id) => {
    return await Product.findByIdAndDelete(id);
};
