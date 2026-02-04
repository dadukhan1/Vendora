/** @format */

import express from "express";
import sellerAuthMiddleware from "../middlewares/SellerAuthMiddleware.js";
import TransactionController from "../controller/TransactionController.js";

const router = express.Router();

router.get(
  "/seller",
  sellerAuthMiddleware,
  TransactionController.getTransactionBySeller,
);

export const TransactionrRouter = router;
