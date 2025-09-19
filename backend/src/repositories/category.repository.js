import Category from '../models/category.model.js';

export const createCategory = async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
};

export const findCategoryById = async (id) => {
    return await Category.findById(id).populate('products');
};

export const getAllCategories = async () => {
    return await Category.find({}).populate('products');
};

export const updateCategoryById = async (id, updateData) => {
    return await Category.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const deleteCategoryById = async (id) => {
    return await Category.findByIdAndDelete(id);
};
