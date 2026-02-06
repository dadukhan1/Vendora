/** @format */

import express from "express";
import DealController from "../controller/DealController.js";
import sellerAuthMiddleware from "../middlewares/SellerAuthMiddleware.js";

const DealRouter = express.Router();

DealRouter.get("/", DealController.getAllDeals);
DealRouter.post("/", sellerAuthMiddleware, DealController.createDeal);
DealRouter.patch("/:id", sellerAuthMiddleware, DealController.updateDeal);
DealRouter.delete("/:id", sellerAuthMiddleware, DealController.deleteDeal);

export default DealRouter;
