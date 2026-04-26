/** @format */

import express from "express";
import AuthController from "../controller/AuthController.js";

const router = express.Router();

router.post("/sent/signin-signup-otp", AuthController.sendSigninOtp);
router.post("/signup", AuthController.createUser);
router.post("/signin", AuthController.signIn);

export const AuthRouter = router;
