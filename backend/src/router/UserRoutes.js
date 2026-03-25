/** @format */

import express from "express";
import UserController from "../controller/UserController.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/profile", authMiddleware, UserController.getUserProfileByJwt);

router.put("/update", authMiddleware, UserController.updateUserProfile);

export const UserRouter = router;
