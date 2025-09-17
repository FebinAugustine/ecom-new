import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as productService from '../services/product.service.js';

const createProduct = asyncHandler(async (req, res) => {
    const imagePaths = req.files.map(file => file.path);
    const product = await productService.createProductService(req.body, req.user._id, imagePaths);
    return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
    const result = await productService.getAllProductsService(req.query);
    return res.status(200).json(new ApiResponse(200, result, "Products retrieved successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await productService.getProductByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, product, "Product retrieved successfully"));
});

const getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await productService.getProductsByCategoryService(req.params.category);
    return res.status(200).json(new ApiResponse(200, products, "Products retrieved successfully"));
});

const getProductsBySeller = asyncHandler(async (req, res) => {
    const products = await productService.getProductsBySellerService(req.params.id);
    return res.status(200).json(new ApiResponse(200, products, "Products retrieved successfully"));
});

const updateProductById = asyncHandler(async (req, res) => {
    const updatedProduct = await productService.updateProductByIdService(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const updateProductImages = asyncHandler(async (req, res) => {
    const imagePaths = req.files.map(file => file.path);
    const updatedProduct = await productService.updateProductImagesService(req.params.id, imagePaths);
    return res.status(200).json(new ApiResponse(200, updatedProduct, "Product images updated successfully"));
});

const deleteProductById = asyncHandler(async (req, res) => {
    const result = await productService.deleteProductByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, result, "Product deleted successfully"));
});

export {
    createProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getProductsBySeller,
    updateProductById,
    updateProductImages,
    deleteProductById
};
