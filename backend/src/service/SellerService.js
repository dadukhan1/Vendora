/** @format */

import { Address } from "../models/Address.js";
import { Seller } from "../models/Seller.js";
import JwtProvider from "../utils/jwtProvider.js";
import bcrypt from "bcrypt";

class SellerService {
  async createSeller(req) {
    const {
      sellerName,
      mobile,
      email,
      password,
      GSTIN,
      pickupAddress,
      bankDetails,
      bussinessDetails,
    } = req.body;

    if (!sellerName || !mobile || !email || !password || !GSTIN) {
      throw new Error("Required fields are missing");
    }

    if (
      !pickupAddress?.address ||
      !pickupAddress?.city ||
      !pickupAddress?.state ||
      !pickupAddress?.pinCode
    ) {
      throw new Error("Pickup address is incomplete");
    }

    if (!bankDetails?.accountHOlderName || !bankDetails?.accountNumber) {
      throw new Error("Bank details are incomplete");
    }

    if (
      !bussinessDetails?.bussinessName ||
      !bussinessDetails?.bussinessEmail
      // ||
      // !bussinessDetails?.bussinessPhone
    ) {
      throw new Error("Business details are incomplete");
    }

    const existingEmail = await Seller.findOne({ email });
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedAddress = await Address.create({
      ...pickupAddress,
    });

    //  Create seller
    const newSeller = await Seller.create({
      sellerName,
      mobile,
      email,
      password: hashedPassword,
      GSTIN,
      pickupAddress: savedAddress._id, // reference
      bankDetails: {
        accountHOlderName: bankDetails.accountHolderName,
        accountNumber: bankDetails.accountNumber,
        ifsCode: bankDetails.ifsCode,
      },
      bussinessDetails: {
        bussinessName: bussinessDetails.bussinessName,
        bussinessEmail: bussinessDetails.bussinessEmail,
        bussinessMobile: bussinessDetails.bussinessPhone,
        bussinessAddress: bussinessDetails.bussinessAddress,
      },
    });

    return newSeller;
  }

  async getSellerProfile(jwt) {
    const email = JwtProvider.getEmailFromJwt(jwt);
    return this.getSellerByEmail(email);
  }

  async getSellerByEmail(email) {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      throw new Error("Seller Not Found");
    }
    return seller;
  }
  async getSellerById(id) {
    const seller = await Seller.findById(id);
    if (!seller) {
      throw new Error("Seller not found!");
    }
    return seller;
  }

  async getAllSellers(status) {
    return await Seller.find({ accountStatus: status });
  }

  async updateSeller(existingSeller, sellerData) {
    return await Seller.findByIdAndUpdate(existingSeller._id, sellerData, {
      new: true,
    });
  }

  async updateSellerStatus(sellerId, status) {
    return await Seller.findByIdAndUpdate(
      sellerId,
      { $set: { accountStatus: status } },
      { new: true },
    );
  }

  async deleteSeller(sellerId) {
    return await Seller.findByIdAndDelete(sellerId);
  }
}

export default new SellerService();
