/** @format */

import express from "express";
import ProductController from "../controller/ProductController.js";
import sellerAuthMiddleware from "../middlewares/SellerAuthMiddleware.js";

const router = express.Router();

router.get("/", sellerAuthMiddleware, ProductController.getProductBySellerId);
router.post(
  "/",
  upload.array("images", 4),
  sellerAuthMiddleware,
  ProductController.createProduct,
);
router.delete("/", sellerAuthMiddleware, ProductController.deleteProduct);
router.put("/productId", sellerAuthMiddleware, ProductController.updateProduct);

export const SellerProductRouter = router;
