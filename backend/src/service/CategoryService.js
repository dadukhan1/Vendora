/** @format */

import { Category } from "../models/Category.js";

class CategoryService {
  async getAllCategories() {
    // Sort by isActive (true first) and then by order ascending
    return await Category.find()
      .populate("parentCategory")
      .sort({ isActive: -1, order: 1 });
  }

  async toggleCategoryActive(id, isActive) {
    return await Category.findByIdAndUpdate(id, { isActive }, { new: true });
  }

  async getCategoryById(id) {
    return await Category.findById(id).populate("parentCategory");
  }

  async createCategory(categoryData) {
    // Clean data: ensure empty strings for parentCategory are null
    if (categoryData.parentCategory === "" || categoryData.parentCategory === "null") {
      categoryData.parentCategory = null;
    }
    return await Category.create(categoryData);
  }

  async updateCategory(id, updateData) {
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteCategory(id) {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    // Optional: handle children categories (e.g. set parent to null or delete them)
    // For now, let's just delete the category
    return await Category.findByIdAndDelete(id);
  }

  async getChildrenCategories(parentId) {
    return await Category.find({ parentCategory: parentId });
  }
}

export default new CategoryService();
