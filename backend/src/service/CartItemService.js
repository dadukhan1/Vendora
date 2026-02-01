/** @format */

import { CartItem } from "../models/CartItem.js";

class CartItemService {
  async removeCartItem(userId, cartItemId) {
    const deletedItem = await CartItem.findOneAndDelete({
      _id: cartItemId,
      userId,
    });

    if (!deletedItem) {
      throw new Error("Cart item not found or unauthorized");
    }

    return deletedItem;
  }

  async updateCartItem(userId, cartItemId, cartItemData) {
    const cartItem = await CartItem.findOne({
      _id: cartItemId,
      userId,
    }).populate("product");

    if (!cartItem) {
      throw new Error("Cart item not found or unauthorized");
    }

    const update = {
      quantity: cartItemData.quantity,
      mrpPrice: cartItemData.quantity * cartItem.product.mrpPrice,
      sellingPrice: cartItemData.quantity * cartItem.product.sellingPrice,
    };

    const updatedItem = await CartItem.findByIdAndUpdate(cartItemId, update, {
      new: true,
      runValidators: true,
    });

    return updatedItem;
  }
}

export default new CartItemService();
