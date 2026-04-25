/** @format */

import { Cart } from "../models/Cart.js";
import { CartItem } from "../models/CartItem.js";
import { calculateDiscountPercentage } from "../utils/calculateDiscountPercentage.js";

class CartService {

  async findUserCart(user) {

    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = await Cart.create({ user: user._id });
    }

    const cartItems = await CartItem
      .find({ cart: cart._id })
      .populate({
        path: "product",
        populate: {
          path: "seller",
          select: "businessDetails.businessName"
        }
      });

    let totalMrpPrice = 0;
    let totalSellingPrice = 0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      totalMrpPrice += item.mrpPrice * item.quantity;
      totalSellingPrice += item.sellingPrice * item.quantity;
      totalItems += item.quantity;
    });

    cart.totalMrpPrice = totalMrpPrice;
    cart.totalSellingPrice = totalSellingPrice;
    cart.totalItems = totalItems;
    cart.discount = calculateDiscountPercentage(
      totalMrpPrice,
      totalSellingPrice
    );

    cart.cartItems = cartItems;

    return cart;
  }


  async addCartItems(user, product, size, quantity) {

    const cart = await this.findUserCart(user);

    let cartItem = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      size: size
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
      return cartItem;
    }

    const newCartItem = await CartItem.create({
      cart: cart._id,
      product: product._id,
      userId: user._id,
      size: size,
      quantity: quantity,
      sellingPrice: product.sellingPrice,
      mrpPrice: product.mrpPrice
    });

    return newCartItem;
  }

}

export default new CartService();