/** @format */

import DealService from "../service/DealService.js";

class DealController {
  async getAllDeals(req, res) {
    try {
      const deals = await DealService.getDeals();
      res.status(200).json(deals);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async createDeal(req, res) {
    try {
      const { deal } = req.body;
      const newDeal = await DealService.createDeal(deal);
      res.status(201).json(newDeal);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateDeal(req, res) {
    try {
      const deal = await DealService.updateDeal(req.params.id, req.body);
      res.status(200).json(deal);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteDeal(req, res) {
    try {
      await DealService.deleteDeal(req.params.id);
      res.status(200).json({ message: "Deal deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new DealController();
