/** @format */

import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { calculateDiscountPercentage } from "../utils/calculateDiscountPercentage.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

class ProductService {
  async createProduct(req, seller) {
    const {
      title,
      description,
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

    // Upload new images to Cloudinary
    const uploadedImages = req.files?.length
      ? await Promise.all(
          req.files.map((file) =>
            uploadOnCloudinary(file.buffer).then((r) => r.secure_url),
          ),
        )
      : [];

    const product = await Product.create({
      title,
      description,
      images: uploadedImages,
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
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.images && product.images.length > 0) {
      for (const url of product.images) {
        const publicId = url.split("/").slice(-2).join("/").split(".")[0]; // extract public_id
        await deleteOnCloudinary(publicId);
      }
    }

    await Product.findByIdAndDelete(productId);

    return product;
  }

  async updateProduct(productId, updatedData, files = []) {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    if (files.length > 0 && product.images.length > 0) {
      for (const url of product.images) {
        const publicId = url
          .split("/upload/")[1]
          .replace(/^v\d+\//, "")
          .replace(/\.[^/.]+$/, "");
        await deleteOnCloudinary(publicId);
      }

      const uploadedImages = await Promise.all(
        files.map((f) =>
          uploadOnCloudinary(f.buffer).then((r) => r.secure_url),
        ),
      );
      updatedData.images = uploadedImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true },
    );
    return updatedProduct;
  }

  async findProductById(productId) {
    const product = await Product.findById(productId).populate("seller");

    if (!product) {
      throw new Error("Product not found!");
    }

    return product;
  }

  async searchProduct(query) {
    const normalizedQuery = (query || "").trim();
    if (!normalizedQuery) return [];
    return await Product.find({
      $or: [
        { title: new RegExp(normalizedQuery, "i") },
        { description: new RegExp(normalizedQuery, "i") },
      ],
    });
  }

  async getProductsBySeller(sellerId) {
    return await Product.find({ seller: sellerId });
  }

  async getAllChildCategoryIds(parentId) {
    // Only return IDs for categories that are active
    const children = await Category.find({ parentCategory: parentId, isActive: true });
    if (children.length === 0) return [parentId];

    const nestedIds = await Promise.all(
      children.map((child) => this.getAllChildCategoryIds(child._id)),
    );
    return [parentId, ...nestedIds.flat()];
  }

  async getAllProducts(query) {
    const filterQuery = {};

    const pageNumber = Number(query.pageNumber) || 1;
    const limit = 12;

    if (query.category) {
      let category = await Category.findOne({ categoryId: query.category });
      if (!category) {
        category = await Category.findById(query.category);
      }

      // If category is not found or is deactivated, don't show any products
      if (!category || (category.isActive === false && !query.isAdmin)) {
        return {
          content: [],
          totalPages: 0,
          totalElements: 0,
        };
      }

      // Recursively find all ACTIVE child category IDs
      const categoryIds = await this.getAllChildCategoryIds(category._id);
      filterQuery.category = { $in: categoryIds };
    }

    if (query.color) {
      filterQuery.color = query.color;
    }

    // Use `!= null` so minPrice = 0 still works (e.g. "Below 500").
    if (query.minPrice != null && query.maxPrice != null) {
      filterQuery.sellingPrice = {
        $gte: Number(query.minPrice),
        $lte: Number(query.maxPrice),
      };
    }

    if (query.minDiscount != null) {
      // In DB the field name is `discount` (percentage).
      filterQuery.discount = { $gte: Number(query.minDiscount) };
    }

    if (query.size) {
      filterQuery.size = query.size;
    }

    if (query.search) {
      const normalizedSearch = String(query.search).trim();
      if (normalizedSearch) {
        filterQuery.$or = [
          { title: new RegExp(normalizedSearch, "i") },
          { description: new RegExp(normalizedSearch, "i") },
        ];
      }
    }

    if (query.isFeatured) {
      filterQuery.isFeatured = query.isFeatured === "true";
    }

    let sortQuery = {};

    if (query.sort === "price_low") {
      sortQuery.sellingPrice = 1;
    }

    if (query.sort === "price_high") {
      sortQuery.sellingPrice = -1;
    }

    if (query.sort === "newest") {
      sortQuery.createdAt = -1;
    }

    const products = await Product.find(filterQuery)
      .sort(sortQuery)
      .skip((pageNumber - 1) * limit)
      .limit(limit);

    const totalElements = await Product.countDocuments(filterQuery);

    const totalPages = Math.ceil(totalElements / limit);

    return {
      content: products,
      totalPages,
      totalElements,
      currentPage: pageNumber,
    };
  }
}

export default new ProductService();
