/** @format */

import WishlistService from "../service/WishlistService.js";
import ProductService from "../service/ProductService.js";

class WishlistController {
  async getWishlist(req, res) {
    try {
      const user = req.user;
      const wishlist = await WishlistService.getWishlistByUserId(user);
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addProductToWishlist(req, res) {
    try {
      const user = req.user;
      const { productId } = req.params;
      const product = await ProductService.findProductById(productId);
      const wishlist = await WishlistService.addProductToWishlist(user, product);
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new WishlistController();
