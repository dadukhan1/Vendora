/** @format */

import express from "express";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import ReviewController from "../controller/ReviewController.js";

const router = express.Router();

router.get("/product/:productId", ReviewController.getProductReviews);
router.get("/product/:productId/check-purchase", authMiddleware, ReviewController.checkPurchaseStatus);
router.post("/product/:productId", authMiddleware, ReviewController.createReview);
// router.delete("/:reviewId", authMiddleware, ReviewController.deleteReview);

export const ReviewRouter = router;
