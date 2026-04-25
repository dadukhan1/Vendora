/** @format */

import { Banner } from "../models/HomeBanner.js";
import { Product } from "../models/Product.js";

const BannerController = {
  getHomeBanners: async (req, res) => {
    try {
      const dbBanners = await Banner.find({ isActive: true });
      
      const productBanners = await Product.find({ isBanner: true }).populate("category");
      
      const mappedProducts = productBanners.map(p => ({
        _id: p._id,
        image: p.images[0],
        title: p.title,
        description: p.description,
        categoryId: p.category?.categoryId,
        productId: p._id, // Add productId to distinguish
        type: "product"
      }));

      const allBanners = [...dbBanners, ...mappedProducts];
      res.json(allBanners);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createBanner: async (req, res) => {
    try {
      const banner = await Banner.create(req.body);
      res.status(201).json(banner);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteBanner: async (req, res) => {
    try {
      await Banner.findByIdAndDelete(req.params.id);
      res.json({ message: "Banner deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default BannerController;
