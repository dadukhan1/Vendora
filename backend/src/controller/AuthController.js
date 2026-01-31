/** @format */

import AuthService from "../service/AuthService.js";

class AuthController {
  async sendLoginOtp(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        throw new Error("Email is required!");
      }
      await AuthService.sendLoginOtp(email);

      res.status(200).json({ message: "OTP send successfully. " });
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }
}

export default new AuthController();
