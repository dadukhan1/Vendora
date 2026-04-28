/** @format */

import mongoose from "mongoose";
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

  async updateCartItem(userId, cartItemId, quantity) {
    if (quantity === 0) {
      await CartItem.deleteOne({ _id: cartItemId, userId });
      return { message: "Item removed from cart" };
    }

    const cartItem = await CartItem.findOne({
      _id: cartItemId,
      userId: userId,
    }).populate("product");

    if (!cartItem) {
      throw new Error("Cart item not found or unauthorized");
    }

    const update = {
      quantity,
    };

    const updatedItem = await CartItem.findOneAndUpdate(
      { _id: cartItemId, userId },
      update,
      { new: true, runValidators: true },
    ).populate("product");

    return updatedItem;
  }
}

export default new CartItemService();
