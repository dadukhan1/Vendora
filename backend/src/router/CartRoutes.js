/** @format */

import express from "express";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import CartController from "../controller/CartController.js";

const router = express.Router();

router.get("/", authMiddleware, CartController.findUserCartHandler);
router.post("/items", authMiddleware, CartController.addItemToCart);
router.delete(
  "/items/:cartItemId",
  authMiddleware,
  CartController.deleteCartItem,
);
router.put("/items/:cartItemId", authMiddleware, CartController.updateCartItem);

export const CartRouter = router;
