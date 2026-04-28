/** @format */

import { Review } from "../models/Review.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";

class ReviewService {
  async createReview(user, product, requestData) {
    const { reviewText, rating, images } = requestData;

    // Count how many unique orders contain this product (any status except CANCELLED)
    const userOrders = await Order.find({ 
        user: user._id, 
        orderStatus: { $ne: "CANCELLED" }
    }).populate("orderItems");

    const purchaseCount = userOrders.filter(order => 
        order.orderItems.some(item => {
            const itemProdId = item.product?._id ? item.product._id.toString() : item.product.toString();
            return itemProdId === product._id.toString();
        })
    ).length;

    if (purchaseCount === 0) {
      throw new Error("Only verified buyers can leave a review for this product.");
    }

    // Count how many reviews the user has already left for this product
    const reviewCount = await Review.countDocuments({ user: user._id, product: product._id });

    if (reviewCount >= purchaseCount) {
      throw new Error("You have already reviewed all your purchases for this product.");
    }

    const review = await Review.create({
      user: user._id,
      product: product._id,
      reviewText,
      rating,
      images
    });

    // Update Product average rating and count
    const reviews = await Review.find({ product: product._id });
    const numReviews = reviews.length;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / numReviews;

    await Product.findByIdAndUpdate(product._id, {
      numReviews,
      avgRating: parseFloat(avgRating.toFixed(1))
    });
    return await review.populate("user", "fullName email mobile");
  }

  async getProductReviews(productId) {
    return await Review.find({ product: productId })
      .populate("user", "fullName email mobile")
      .sort({ createdAt: -1 });
  }

  // async deleteReview(reviewId, userId) {
  //   const review = await Review.findById(reviewId);
  //   if (!review) {
  //     throw new Error("Review not found");
  //   }
  //   if (review.user.toString() !== userId.toString()) {
  //     throw new Error("You are not authorized to delete this review");
  //   }
  //   await Review.findByIdAndDelete(reviewId);
  //   return { message: "Review deleted successfully" };
  // }

  async canUserReview(userId, productId) {
    const userOrders = await Order.find({ user: userId }).populate("orderItems");
    const hasPurchased = userOrders.some(order =>
      order.orderItems.some(item => item.product.toString() === productId.toString())
    );
    return hasPurchased;
  }
}

export default new ReviewService();
