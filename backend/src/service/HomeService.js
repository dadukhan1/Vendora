/** @format */

import HomeCategorySection from "../domain/HomeCategorySection";
import DealService from "./DealService";

class HomeService {
  async createHomePageData(allCategories) {
    try {
      const gridCategories = allCategories.filter(
        (category) => category.section === HomeCategorySection.GRID,
      );

      const shopByCategories = allCategories.filter(
        (category) =>
          category.section === HomeCategorySection.SHOP_BY_CATEGORIES,
      );
      const electricCategories = allCategories.filter(
        (category) =>
          category.section === HomeCategorySection.ELECTRIC_CATEGORIES,
      );

      const dealCategories = allCategories.filter(
        (category) => category.section === HomeCategorySection.DEALS,
      );

      const deals = await DealService.getDeals();

      const home = {
        grid: gridCategories,
        shopByCategories,
        electricCategories,
        deals,
        dealCategories,
      };

      return home;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new HomeService();
