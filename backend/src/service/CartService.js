/** @format */

import { Cart } from "../models/Cart.js";
import { CartItem } from "../models/CartItem.js";
import { calculateDiscountPercentage } from "../utils/calculateDiscountPercentage.js";

class CartService {
  async findUserCart(user) {
    const cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItems = await CartItem.find({ cart: cart._id }).populate(
      "product",
    );

    let totalPrice = 0;
    let totalDiscountedPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.mrpPrice * item.quantity;
      totalDiscountedPrice += item.sellingPrice * item.quantity;
    });

    cart.totalMrpPrice = totalPrice;
    cart.totalSellingPrice = totalDiscountedPrice;
    cart.totalItems = cartItems.length;
    cart.discount = calculateDiscountPercentage(
      totalPrice,
      totalDiscountedPrice,
    );
    cart.cartItems = cartItems;

    return cart;
  }

  async addCartItems(user, product, size, quantity) {
    const cart = await this.findUserCart(user);

    let isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      size: size,
    }).populate("product");

    if (!isPresent) {
      const cartItem = await CartItem.create({
        product: product._id,
        quantity,
        userId: user._id,
        sellingPrice: quantity * product.sellingPrice,
        mrpPrice: quantity * product.mrpPrice,
        size,
        cart: cart._id,
      });

      cart.cartItems.push(cartItem._id);
      await cart.save();

      return cartItem;
    }

    return isPresent;
  }
}

export default new CartService();
