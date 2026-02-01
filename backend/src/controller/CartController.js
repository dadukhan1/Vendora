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
      const user = await req.user;
      const { size, quantity, productId } = req.body;

      const product = await ProductService.findProductById(productId);

      const cartItem = await CartService.addCartItems(
        user,
        product,
        size,
        quantity,
      );

      res.status(200).json(cartItem);
    } catch (error) {
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
      const cartItemId = req.params.cartItemId;
      const { quantity } = req.body;
      const user = req.user;

      let updatedCartItem;

      if (quantity > 0) {
        updatedCartItem = await CartItemService.updateCartItem(
          user._id,
          cartItemId,
          { quantity },
        );
      }

      res.status(200).json(updatedCartItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CartController();
