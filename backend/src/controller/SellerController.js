/** @format */

import { UserRoles } from "../domain/UserRoles.js";
import { VerificationCode } from "../models/VerificationCode.js";
import SellerService from "../service/SellerService.js";
import jwtProvider from "../utils/jwtProvider.js";

class SellerController {
  async getSellerProfile(req, res) {
    try {
      const jwt = req.headers.authorization.split(" ")[1];
      const seller = await SellerService.getSellerProfile(jwt);

      res.status(200).json(seller);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async createSeller(req, res) {
    try {
      const seller = await SellerService.createSeller(req.body);

      res.status(200).json({ message: "Seller created successfully!" });
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async getAllSellers(req, res) {
    try {
      const { status } = req.query;
      const sellers = await SellerService.getAllSellers(status);

      res.status(200).json(sellers);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async updateSeller(req, res) {
    try {
      const existingSeller = req.seller;
      const seller = await SellerService.updateSeller(existingSeller, req.body);

      res.status(200).json(seller);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async deleteSeller(req, res) {
    try {
      await SellerService.deleteSeller(req.params.id);

      res.status(200).json({ message: "Seller deleted successfully!" });
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async updateSellerStatus(req, res) {
    try {
      const updateSeller = await SellerService.updateSellerStatus(
        req.params.id,
        req.params.status,
      );

      res.status(200).json(updateSeller);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async verifyLoginOtp(req, res) {
    try {
      const { otp, email } = req.body;
      const seller = await SellerService.getSellerByEmail(email);

      if (!seller) throw new Error("User doesn't exists!");

      const verificationCode = await VerificationCode.findOne({ email });
      if (!verificationCode || verificationCode.otp !== otp) {
        throw new Error("Invalid OTP");
      }

      const token = jwtProvider.createJwt({ email });

      const authResponse = {
        message: "Login Successfull",
        jwt: token,
        role: UserRoles.SELLER,
      };

      return res.status(200).json(authResponse);
    } catch (error) {
      res
        .status(error instanceof Error ? 404 : 500)
        .json({ message: error.message });
    }
  }
}

export default new SellerController();
