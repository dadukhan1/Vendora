/** @format */

import { Address } from "../models/Address.js";
import { Seller } from "../models/Seller.js";
import JwtProvider from "../utils/jwtProvider.js";

class SellerService {
  async createSeller(sellerData) {
    if (
      !sellerData.sellerName ||
      !sellerData.mobile ||
      !sellerData.email ||
      !sellerData.password ||
      !sellerData.GSTIN
    ) {
      throw new Error("All fields are required");
    }

    const existingEmail = await Seller.findOne({ email: sellerData.email });

    if (existingEmail) throw new Error("Email already exists");

    const savedAddress = await Address.create(sellerData.pickUpAddress);

    const newSeller = new Seller({
      sellerName: sellerData.sellerName,
      email: sellerData.email,
      password: sellerData.password,
      pickUpAddress: savedAddress._id,
      GSTIN: sellerData.GSTIN,
      mobile: sellerData.mobile,
      bankDetails: sellerData.bankDetails,
      businessDetails: sellerData.businessDetails,
    });

    return await newSeller.save();
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
