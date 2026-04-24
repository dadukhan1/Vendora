/** @format */

import express from "express";
import DealController from "../controller/DealController.js";
import sellerAuthMiddleware from "../middlewares/SellerAuthMiddleware.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";

const DealRouter = express.Router();

DealRouter.get("/", DealController.getAllDeals);
DealRouter.post("/", authMiddleware, DealController.createDeal);
DealRouter.patch("/:id", authMiddleware, DealController.updateDeal);
DealRouter.delete("/:id", authMiddleware, DealController.deleteDeal);

export default DealRouter;
