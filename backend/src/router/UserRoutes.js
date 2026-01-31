/** @format */

import express from "express";
import UserController from "../controller/UserController.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, UserController.getUserProfileByJwt);

export const UserRouter = router;
