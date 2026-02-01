/** @format */

import express from "express";
import ProductController from "../controller/ProductController.js";

const router = express.Router();

router.get("/search", ProductController.searchProduct);

router.get("/", ProductController.getAllProducts);

router.get("/:productId", ProductController.getProductById);

export const ProductRouter = router;
