/** @format */

import express from "express";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import OrderController from "../controller/OrderController.js";

const router = express.Router();

router.post("/", authMiddleware, OrderController.createOrder);

router.get("/user", authMiddleware, OrderController.getUserOrders);

router.put("/:orderId/cancel", authMiddleware, OrderController.cancelOrder);

router.get("/:orderId", authMiddleware, OrderController.getOrderById);

router.get("/item/:orderItemId", authMiddleware, OrderController.getItemById);

export const OrderRouter = router;
