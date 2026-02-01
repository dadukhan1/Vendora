/** @format */

import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { calculateDiscountPercentage } from "../utils/calculateDiscountPercentage.js";

class ProductService {
  async createProduct(req, seller) {
    const {
      title,
      description,
      images,
      sellingPrice,
      mrpPrice,
      size,
      color,
      quantity,
    } = req.body;
    const discountPercent = calculateDiscountPercentage(mrpPrice, sellingPrice);

    const category1 = await this.createOrGetCategory(req.body.category, 1);
    const category2 = await this.createOrGetCategory(
      req.body.category2,
      2,
      category1._id,
    );
    const category3 = await this.createOrGetCategory(
      req.body.category3,
      3,
      category2._id,
    );

    const product = await Product.create({
      title,
      description,
      images,
      sellingPrice,
      mrpPrice,
      discount: discountPercent,
      size,
      color,
      quantity,
      seller: seller._id,
      category: category3._id,
    });

    return product;
  }

  async createOrGetCategory(categoryId, level, parentId = null) {
    let category = await Category.findOne({ categoryId });
    if (!category) {
      category = await Category.create({
        categoryId,
        level,
        parentCategory: parentId,
      });
    }
    return category;
  }

  async deleteProduct(productId) {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async updateProduct(productId, updatedProductData) {
    const product = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true },
    );
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async findProductById(productId) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found!");
    }

    return product;
  }

  async searchProduct(query) {
    const products = await Product.find({
      title: new RegExp(query, "i"),
    });

    if (products.length === 0) {
      throw new Error("No products found!");
    }

    return products;
  }

  async getProductsBySeller(sellerId) {
    return await Product.find({ seller: sellerId });
  }

  async getAllProducts(req) {
    const filterQuery = {};

    if (req.category) {
      const category = await Category.findOne({ categoryId: req.category });
      if (!category) {
        return {
          content: [],
          totalPages: 0,
          totalElements: 0,
        };
      }
      filterQuery.category = category._id;
    }

    if (req.color) {
      filterQuery.color = req.color;
    }

    if (req.minPrice && req.maxPrice) {
      filterQuery.sellingPrice = { $gte: req.minPrice, $lte: req.maxPrice };
    }

    if (req.minDiscount) {
      filterQuery.minDiscount = { $gte: req.minDiscount };
    }

    if (req.size) {
      filterQuery.size = req.size;
    }

    let sortQuery = {};

    if (req.sort === "price_low") {
      sortQuery.sellingPrice = 1;
    }
    if (req.sort === "price_high") {
      sortQuery.sellingPrice = -1;
    }

    const products = await Product.find(filterQuery)
      .sort(sortQuery)
      .skip(req.pageNumber * 10)
      .limit(10);

    const totalElements = await Product.countDocuments(filterQuery);

    const totalPages = Math.ceil(totalElements / 10);

    const response = {
      content: products,
      totalPages,
      totalElements,
    };

    return response;
  }
}

export default new ProductService();
