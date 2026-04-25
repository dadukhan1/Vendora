/** @format */

import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  activateCategory,
  deactivateCategory,
} from "../controller/AdminCategoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.put("/:id/activate", activateCategory);
router.put("/:id/deactivate", deactivateCategory);
router.delete("/:id", deleteCategory);

export default router;
