import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as categoryService from '../services/category.service.js';

const createCategory = asyncHandler(async (req, res) => {
    const imagePath = req.file?.path;
    const category = await categoryService.createCategoryService(req.body, imagePath);
    return res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
});

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.getAllCategoriesService();
    return res.status(200).json(new ApiResponse(200, categories, "Categories retrieved successfully"));
});

const getCategoryById = asyncHandler(async (req, res) => {
    const category = await categoryService.getCategoryByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, category, "Category retrieved successfully"));
});

const updateCategoryById = asyncHandler(async (req, res) => {
    const imagePath = req.file?.path;
    const updatedCategory = await categoryService.updateCategoryByIdService(req.params.id, req.body, imagePath);
    return res.status(200).json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
});

const deleteCategoryById = asyncHandler(async (req, res) => {
    const result = await categoryService.deleteCategoryByIdService(req.params.id);
    return res.status(200).json(new ApiResponse(200, result, "Category deleted successfully"));
});

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};
