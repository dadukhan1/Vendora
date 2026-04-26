/** @format */

import { UserRoles } from "../domain/UserRoles.js";
import AuthService from "../service/AuthService.js";

class AuthController {
  async sendSigninOtp(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required!" });
      }

      await AuthService.sendSigninOtp(email);

      res.status(200).json({ message: "OTP send successfully. " });
    } catch (error) {
      const statusCode = error.message === "User not found" ? 404 : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const response = await AuthService.createUser(req);

      return res.status(200).json(response);
    } catch (error) {
      let statusCode = 500;
      if (error.message.includes("already exists")) {
        statusCode = 409;
      } else if (
        error.message === "All fields are required" ||
        error.message === "Invalid OTP"
      ) {
        statusCode = 400;
      }
      res.status(statusCode).json({ message: error.message });
    }
  }

  async signIn(req, res) {
    try {
      const response = await AuthService.signIn(req);
      res.status(200).json(response);
    } catch (error) {
      let statusCode = 500;
      if (error.message === "User not found!") {
        statusCode = 404;
      } else if (
        error.message === "All fields are required" ||
        error.message === "Invalid OTP"
      ) {
        statusCode = 400;
      }
      res.status(statusCode).json({ message: error.message });
    }
  }
}

export default new AuthController();
