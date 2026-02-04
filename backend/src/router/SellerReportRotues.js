/** @format */

import express from "express";
import sellerAuthMiddleware from "../middlewares/SellerAuthMiddleware.js";
import SellerReportController from "../controller/SellerReportController.js";

const router = express.Router();

router.get("/", sellerAuthMiddleware, SellerReportController.getSellerReport);

export const SellerReportRouter = router;
