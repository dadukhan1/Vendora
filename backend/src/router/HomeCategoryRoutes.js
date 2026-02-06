/** @format */

import express from "express";
import HomeCategoryController from "../controller/HomeCategoryController.js";

const router = express.Router();

router.get("/", HomeCategoryController.getAllHomeCategories);
router.post("/", HomeCategoryController.createHomeCategory);
router.patch("/:id", HomeCategoryController.updateHomeCategory);

export default HomeCategoryRouter = router;
