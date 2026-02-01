/** @format */

import ProductService from "../service/ProductService.js";

class ProductController {
  async getProductBySellerId(req, res) {
    try {
      const seller = req.seller;

      const products = await ProductService.getProductsBySeller(seller._id);
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      //   await createProductSchema.validate(req.body, { abortEarly: false });

      const seller = req.seller;

      const product = await ProductService.createProduct(req, seller);
      return res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      await ProductService.deleteProduct(req.params.productId);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await ProductService.updateProduct(
        req.params.productId,
        req.body,
      );

      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await ProductService.findProductById(req.params.productId);

      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async searchProduct(req, res) {
    try {
      const query = req.query.q;
      const products = await ProductService.searchProduct(query);
      return res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts(req.query);
      return res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  
}

export default new ProductController();
