/** @format */

import express from "express";
import ProductController from "../controller/ProductController.js";
import sellerAuthMiddleware from "../middlewares/SellerAuthMiddleware.js";

const router = express.Router();

router.get("/", sellerAuthMiddleware, ProductController.getProductBySellerId);
router.post("/", sellerAuthMiddleware, ProductController.createProduct);
router.delete("/", sellerAuthMiddleware, ProductController.deleteProduct);
router.patch("/", sellerAuthMiddleware, ProductController.updateProduct);

export const SellerProductRouter = router;
