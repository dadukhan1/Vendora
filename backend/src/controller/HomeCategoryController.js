/** @format */

import HomeCategoryService from "../service/HomeCategoryService.js";
import HomeService from "../service/HomeService.js";

class HomeCategoryController {
  async createHomeCategory(req, res) {
    try {
      const { category } = req.body;
      // const homeCategory =
      //   await HomeCategoryService.createHomeCategories(category);
      const allCategories = await HomeCategoryService.getAllHomeCategories();
      const home = await HomeService.createHomePageData(allCategories);
      return res.status(201).json(home);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getAllHomeCategories(req, res) {
    try {
      const homeCategories = await HomeCategoryService.getAllHomeCategories();
      res.status(200).json(homeCategories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateHomeCategory(req, res) {
    try {
      const homeCategory = await HomeCategoryService.updateHomeCategory(
        req.params.id,
        req.body,
      );
      res.status(200).json(homeCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getSingleHomeCategory(req, res) {
    try {
      console.log("1");
      const homeCategory = await HomeCategoryService.getSingleHomeCategory(
        req.params.id,
      );
      console.log(homeCategory);
      if (!homeCategory)
        return res.status(404).json({ message: "Category not found" });
      res.status(200).json(homeCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new HomeCategoryController();
