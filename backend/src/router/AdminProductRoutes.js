/** @format */

import express from "express";
import AdminProductController from "../controller/AdminProductController.js";

const router = express.Router();

router.get("/", AdminProductController.getAllProducts);
router.patch("/:id/toggle", AdminProductController.toggleField);

export default router;
