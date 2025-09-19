import * as categoryRepository from '../repositories/category.repository.js';
import ApiError from '../utils/ApiErrors.js';
import redisClient from '../config/redis.js';
import { uploadOnCloudinary, deleteImageFromCloudinary } from '../utils/cloudinary.fileuplaod.js';

export const createCategoryService = async (categoryData, imagePath) => {
    const { name } = categoryData;

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Category name is required");
    }

    let imageUrl = '';
    if (imagePath) {
        const result = await uploadOnCloudinary(imagePath);
        if (result && result.url) {
            imageUrl = result.url;
        } else {
            throw new ApiError(500, "Error uploading image to Cloudinary");
        }
    }

    const category = await categoryRepository.createCategory({ name, image: imageUrl });

    // Invalidate category caches
    await redisClient.del('allCategories');

    return category;
};

export const getAllCategoriesService = async () => {
    const cacheKey = 'allCategories';
    const cachedCategories = await redisClient.get(cacheKey);
    if (cachedCategories) {
        return JSON.parse(cachedCategories);
    }

    const categories = await categoryRepository.getAllCategories();
    await redisClient.set(cacheKey, JSON.stringify(categories), 'EX', 3600); // Cache for 1 hour
    return categories;
};

export const getCategoryByIdService = async (categoryId) => {
    const cacheKey = `category:${categoryId}`;
    const cachedCategory = await redisClient.get(cacheKey);
    if (cachedCategory) {
        return JSON.parse(cachedCategory);
    }

    const category = await categoryRepository.findCategoryById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    await redisClient.set(cacheKey, JSON.stringify(category), 'EX', 3600);
    return category;
};

export const updateCategoryByIdService = async (categoryId, updateData, imagePath) => {
    let imageUrl;
    if (imagePath) {
        const category = await categoryRepository.findCategoryById(categoryId);
        if (category && category.image) {
            const publicId = category.image.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(publicId);
        }
        const result = await uploadOnCloudinary(imagePath);
        if (result && result.url) {
            imageUrl = result.url;
        }
    }

    const dataToUpdate = { ...updateData };
    if (imageUrl) {
        dataToUpdate.image = imageUrl;
    }

    const updatedCategory = await categoryRepository.updateCategoryById(categoryId, dataToUpdate);
    if (!updatedCategory) {
        throw new ApiError(404, "Category not found");
    }

    // Invalidate caches
    await redisClient.del(`category:${categoryId}`);
    await redisClient.del('allCategories');

    return updatedCategory;
};

export const deleteCategoryByIdService = async (categoryId) => {
    const category = await categoryRepository.findCategoryById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    if (category.image) {
        const publicId = category.image.split('/').pop().split('.')[0];
        await deleteImageFromCloudinary(publicId);
    }

    await categoryRepository.deleteCategoryById(categoryId);

    // Invalidate caches
    await redisClient.del(`category:${categoryId}`);
    await redisClient.del('allCategories');

    return { message: "Category deleted successfully" };
};
