/** @format */

import express from "express";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import { applyCoupon, createCoupon } from "../controller/CouponController.js";

const router = express.Router();

// Admin creates coupon
router.post("/", authMiddleware, createCoupon);

// User applies coupon
router.post("/apply", authMiddleware, applyCoupon);

export const CouponRouter = router;
