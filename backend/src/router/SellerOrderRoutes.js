/** @format */

import express from "express";
import sellerAuthMiddleware from "../middlewares/SellerAuthMiddleware.js";
import OrderController from "../controller/OrderController.js";

const router = express.Router();

router.get("/", sellerAuthMiddleware, OrderController.getSellerOrders);

router.put(
  "/:orderId/status/:orderStatus",
  sellerAuthMiddleware,
  OrderController.updateOrderStatus,
);


export const SellerOrderRouter = router;
