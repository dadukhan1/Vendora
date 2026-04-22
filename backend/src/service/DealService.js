/** @format */

import { Deal } from "../models/Deal.js";
import { HomeCategory } from "../models/HomeCategory.js";

class DealService {
  async getDeals() {
    console.log("deals")
    return await Deal.find().populate({
      path: "category",
      select: "name image"
    });
  }

  async createDeal(deal) {
    try {
      const newDeal = await Deal.create({
        ...deal,
        category: deal.category._id || deal.category,
      });
      return await Deal.findById(newDeal._id).populate({ path: "category" });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateDeal(deal, id) {
    try {
      const existingDeal = await Deal.findById(id);

      if (!existingDeal) {
        throw new Error("Deal not found!");
      }

      if (deal.category) {
        const categoryId = deal.category._id || deal.category;
        const categoryExists = await HomeCategory.findById(categoryId);

        if (!categoryExists) {
          throw new Error(`Category with id ${categoryId} not found`);
        }

        deal.category = categoryId;
      }

      return await Deal.findByIdAndUpdate(
        id,
        { ...deal },
        { new: true, runValidators: true },
      ).populate({ path: "category" });
    } catch (error) {
      throw error;
    }
  }

  async deleteDeal(id) {
    return await Deal.findByIdAndDelete(id);
  }
}

export default new DealService();
