/** @format */

import ReviewService from "../service/ReviewService.js";
import ProductService from "../service/ProductService.js";
import { Order } from "../models/Order.js";
import { Review } from "../models/Review.js";
import { OrderItem } from "../models/OrderItem.js";

class ReviewController {
  async createReview(req, res) {
    try {
      const user = req.user;
      const { productId } = req.params;
      const product = await ProductService.findProductById(productId);

      const review = await ReviewService.createReview(user, product, req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductReviews(req, res) {
    try {
      const { productId } = req.params;
      const reviews = await ReviewService.getProductReviews(productId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteReview(req, res) {
    try {
      const user = req.user;
      const { reviewId } = req.params;
      const result = await ReviewService.deleteReview(reviewId, user._id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async checkPurchaseStatus(req, res) {
    try {
      const user = req.user;
      const { productId } = req.params;

      const userOrders = await Order.find({ 
          user: user._id, 
          orderStatus: { $ne: "CANCELLED" }
      }).populate("orderItems");

      const purchaseCount = userOrders.filter(order => 
          order.orderItems.some(item => {
              const itemProdId = item.product?._id ? item.product._id.toString() : item.product.toString();
              return itemProdId === productId.toString();
          })
      ).length;

      const reviewCount = await Review.countDocuments({ user: user._id, product: productId });

      const canReview = purchaseCount > reviewCount;

      res.status(200).json({
        canReview,
        hasPurchased: purchaseCount > 0,
        alreadyReviewed: reviewCount > 0 && reviewCount >= purchaseCount,
        purchaseCount,
        reviewCount
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new ReviewController();
