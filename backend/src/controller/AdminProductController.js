/** @format */

import { Product } from "../models/Product.js";

const AdminProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().populate("category").populate("seller");
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  toggleField: async (req, res) => {
    try {
      const { id } = req.params;
      const { field } = req.body; // 'isBanner' or 'isFeatured'
      
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      product[field] = !product[field];
      await product.save();
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default AdminProductController;
