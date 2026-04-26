/** @format */

import express from "express";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import WishlistController from "../controller/WishlistController.js";

const router = express.Router();

router.get("/", authMiddleware, WishlistController.getWishlist);
router.post("/add/:productId", authMiddleware, WishlistController.addProductToWishlist);

export const WishlistRouter = router;
