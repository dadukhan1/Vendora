/** @format */

import express from "express";
import sellerController from "../controller/SellerController.js";
import sellerAuthMiddleware from "../middlewares/SellerAuthMiddleware.js";

const router = express.Router();

router.get("/profile", sellerController.getSellerProfile);
router.post("/", sellerController.createSeller);
router.get("/", sellerController.getAllSellers);
router.patch("/", sellerAuthMiddleware, sellerController.updateSeller);

router.post("/verify/login-otp", sellerController.verifyLoginOtp);

export const SellerRouter = router;
