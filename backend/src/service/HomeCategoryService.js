/** @format */

import { HomeCategory } from "../models/HomeCategory.js";

class HomeCategoryService {
  async getAllHomeCategories() {
    return await HomeCategory.find();
  }

  async createHomeCategory(homeCategory) {
    return await HomeCategory.create(homeCategory);
  }

  async createHomeCategories(homeCategories) {
    return await HomeCategory.insertMany(homeCategories);
  }

  async updateHomeCategory(id, updateData) {
    return await HomeCategory.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export default new HomeCategoryService();