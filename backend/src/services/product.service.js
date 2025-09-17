import * as productRepository from '../repositories/product.repository.js';
import ApiError from '../utils/ApiErrors.js';
import { redisClient } from '../config/redis.js';
import { uploadOnCloudinary, deleteImageFromCloudinary } from '../utils/cloudinary.fileuplaod.js';

export const createProductService = async (productData, sellerId, imagePaths) => {
    const { name, description, price, inStock, color, sizes, category } = productData;

    if ([name, description, price, inStock, color, sizes, category].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All product fields are required");
    }

    if (!imagePaths || imagePaths.length === 0) {
        throw new ApiError(400, "At least one product image is required");
    }

    const imageUrls = [];
    for (const path of imagePaths) {
        const result = await uploadOnCloudinary(path);
        if (result && result.url) {
            imageUrls.push(result.url);
        } else {
            throw new ApiError(500, "Error uploading one or more images to Cloudinary");
        }
    }

    const product = await productRepository.createProduct({ ...productData, seller: sellerId, images: imageUrls });
    
    // Invalidate product caches
    await redisClient.del('allProducts');

    return product;
};

export const getAllProductsService = async (queryParams) => {
    const { category, seller, sort, page, limit } = queryParams;
    const filters = {};
    if (category) filters.category = category;
    if (seller) filters.seller = seller;

    const sortOptions = sort ? { [sort.split(':')[0]]: sort.split(':')[1] === 'desc' ? -1 : 1 } : { createdAt: -1 };

    const cacheKey = `products:${JSON.stringify(filters)}:${JSON.stringify(sortOptions)}:${page}:${limit}`;
    const cachedProducts = await redisClient.get(cacheKey);
    if (cachedProducts) {
        return JSON.parse(cachedProducts);
    }

    const products = await productRepository.getAllProducts(filters, sortOptions, page, limit);
    await redisClient.set(cacheKey, JSON.stringify(products), 'EX', 3600); // Cache for 1 hour
    return products;
};

export const getProductByIdService = async (productId) => {
    const cacheKey = `product:${productId}`;
    const cachedProduct = await redisClient.get(cacheKey);
    if (cachedProduct) {
        return JSON.parse(cachedProduct);
    }

    const product = await productRepository.findProductById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    await redisClient.set(cacheKey, JSON.stringify(product), 'EX', 3600);
    return product;
};

export const getProductsByCategoryService = async (category) => {
    return await productRepository.getProductsByCategory(category);
};

export const getProductsBySellerService = async (sellerId) => {
    return await productRepository.getProductsBySeller(sellerId);
};

export const updateProductByIdService = async (productId, updateData) => {
    const updatedProduct = await productRepository.updateProductById(productId, updateData);
    if (!updatedProduct) {
        throw new ApiError(404, "Product not found");
    }

    // Invalidate caches
    await redisClient.del(`product:${productId}`);
    await redisClient.del('allProducts');

    return updatedProduct;
};

export const updateProductImagesService = async (productId, imagePaths) => {
    if (!imagePaths || imagePaths.length === 0) {
        throw new ApiError(400, "At least one new image is required");
    }

    const product = await productRepository.findProductById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Delete old images from Cloudinary
    if (product.images && product.images.length > 0) {
        for (const imageUrl of product.images) {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(publicId);
        }
    }

    // Upload new images
    const newImageUrls = [];
    for (const path of imagePaths) {
        const result = await uploadOnCloudinary(path);
        if (result && result.url) {
            newImageUrls.push(result.url);
        } else {
            throw new ApiError(500, "Error uploading new images to Cloudinary");
        }
    }

    const updatedProduct = await productRepository.updateProductById(productId, { images: newImageUrls });

    // Invalidate caches
    await redisClient.del(`product:${productId}`);
    await redisClient.del('allProducts');

    return updatedProduct;
};

export const deleteProductByIdService = async (productId) => {
    const product = await productRepository.findProductById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
        for (const imageUrl of product.images) {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(publicId);
        }
    }

    await productRepository.deleteProductById(productId);

    // Invalidate caches
    await redisClient.del(`product:${productId}`);
    await redisClient.del('allProducts');

    return { message: "Product deleted successfully" };
};
