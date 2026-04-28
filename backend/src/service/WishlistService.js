/** @format */

import { Wishlist } from "../models/Wishlist.js";

class WishlistService {
  async getWishlistByUserId(user) {
    let wishlist = await Wishlist.findOne({ user: user._id }).populate({
      path: "products",
      populate: [
        { path: "category" }
      ]
    });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: user._id });
    }
    return wishlist;
  }

  async addProductToWishlist(user, product) {
    let wishlist = await Wishlist.findOne({ user: user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: user._id });
    }

    const productIndex = wishlist.products.indexOf(product._id);

    if (productIndex !== -1) {
      // Remove product if it exists
      wishlist.products.splice(productIndex, 1);
    } else {
      // Add product if it doesn't exist
      wishlist.products.push(product._id);
    }

    await wishlist.save();
    return await this.getWishlistByUserId(user);
  }
}

export default new WishlistService();
