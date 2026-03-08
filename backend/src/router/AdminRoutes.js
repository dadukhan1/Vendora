/** @format */

import express from "express";
import sellerController from "../controller/SellerController.js";

const router = express.Router();

router.put("/seller/:id/status/:status", sellerController.updateSellerStatus);

export const AdminRouter = router;
