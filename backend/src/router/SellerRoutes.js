/** @format */

import express from "express";
import sellerController from "../controller/SellerController.js";
import sellerAuthMiddleware from "../middlewares/SellerAuthMiddleware.js";

const router = express.Router();

router.get("/profile", sellerController.getSellerProfile);
router.get("/", sellerController.getAllSellers);
router.patch("/", sellerAuthMiddleware, sellerController.updateSeller);

router.post("/signup", sellerController.createSeller);
router.post("/signin", sellerController.signInSeller);

export const SellerRouter = router;
