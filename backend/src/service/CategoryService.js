/** @format */

import { Category } from "../models/Category.js";

class CategoryService {
  async getAllCategories() {
    return await Category.find().populate("parentCategory");
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
