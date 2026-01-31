/** @format */

import { UserRoles } from "../domain/UserRoles.js";
import AuthService from "../service/AuthService.js";

class AuthController {
  async sendLoginOtp(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required!" });
      }

      await AuthService.sendLoginOtp(email);

      res.status(200).json({ message: "OTP send successfully. " });
    } catch (error) {
      const statusCode = error.message === "User not found" ? 404 : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const jwt = await AuthService.createUser(req.body);

      const response = {
        message: "User created successfully",
        jwt,
        role: UserRoles.CUSTOMER,
      };

      return res.status(200).json(response);
    } catch (error) {
      const statusCode = error.message.includes("already exists") ? 409 : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async signIn(req, res) {
    const response = await AuthService.signIn(req.body);

    res.status(201).json(response);
  }
}

export default new AuthController();
