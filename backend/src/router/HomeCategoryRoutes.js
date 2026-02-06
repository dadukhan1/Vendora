/** @format */

import express from "express";
import HomeCategoryController from "../controller/HomeCategoryController.js";

const HomeCategoryRouter = express.Router();

HomeCategoryRouter.get("/", HomeCategoryController.getAllHomeCategories);
HomeCategoryRouter.post("/", HomeCategoryController.createHomeCategory);
HomeCategoryRouter.patch("/:id", HomeCategoryController.updateHomeCategory);

export default HomeCategoryRouter;
