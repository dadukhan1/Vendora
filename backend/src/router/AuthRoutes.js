import express from "express";
import AuthController from "../controller/AuthController.js";

const router = express.Router();

router.post('/sent/login-signup-otp', AuthController.sendLoginOtp)


export const AuthRouter = router;