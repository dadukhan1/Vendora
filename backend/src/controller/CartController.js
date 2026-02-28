/** @format */

import CartItemService from "../service/CartItemService.js";
import CartService from "../service/CartService.js";
import ProductService from "../service/ProductService.js";

class CartController {
  async findUserCartHandler(req, res) {
    try {
      const user = req.user;

      const cart = await CartService.findUserCart(user);

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addItemToCart(req, res) {
    try {
      const user = req.user;
      let { size, quantity, productId } = req.body;

      quantity = Number(quantity);

      if (!quantity || quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
      }

      const product = await ProductService.findProductById(productId);

      const cartItem = await CartService.addCartItems(
        user,
        product,
        size,
        quantity,
      );

      res.status(200).json(cartItem);
    } catch (error) {
      console.log("ERROR OCCURRED:", error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async deleteCartItem(req, res) {
    try {
      const user = req.user;
      const { cartItemId } = req.params;

      await CartItemService.removeCartItem(user._id, cartItemId);

      res.status(200).json({ message: "Item removed from the cart." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCartItem(req, res) {
    try {
      const { cartItemId } = req.params;
      const { quantity } = req.body;
      const user = req.user;

      if (quantity === undefined || isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const result = await CartItemService.updateCartItem(
        user._id,
        cartItemId,
        Number(quantity),
      );

      return res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CartController();
