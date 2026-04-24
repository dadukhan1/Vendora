/** @format */

import CategoryService from "../service/CategoryService.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error("CREATE_CATEGORY_ERROR:", error.message);
    
    // Check for duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category ID already exists. Please use a unique ID." });
    }
    
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.updateCategory(id, req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryService.deleteCategory(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
