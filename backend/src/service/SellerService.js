/** @format */

import mongoose from "mongoose";
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
      businessDetails,
    } = req.body;
    console.log(businessDetails);

    // Validate required fields
    if (!sellerName || !mobile || !email || !password || !GSTIN) {
      throw new Error("Required fields are missing");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Validate password strength
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Validate pickup address
    if (
      !pickupAddress?.address ||
      !pickupAddress?.city ||
      !pickupAddress?.state ||
      !pickupAddress?.pinCode
    ) {
      throw new Error("Complete pickup address required");
    }

    // Validate bank details
    if (
      !bankDetails?.accountHolderName ||
      !bankDetails?.accountNumber) {
      throw new Error("Complete bank details required (account holder, number)");
    }

    // Validate business details
    if (
      !businessDetails?.businessName ||
      !businessDetails?.businessEmail) {
      throw new Error("Complete business details required");
    }

    // Check for existing email
    const existingEmail = await Seller.findOne({ email });
    if (existingEmail) {
      throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use transaction for atomic operation
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create address
      const [savedAddress] = await Address.create([pickupAddress], { session });

      // Create seller
      const [newSeller] = await Seller.create([{
        sellerName,
        mobile,
        email,
        password: hashedPassword,
        GSTIN,
        pickupAddress: savedAddress._id,
        bankDetails: {
          accountHolderName: bankDetails.accountHolderName,
          accountNumber: bankDetails.accountNumber,
        },
        businessDetails: {
          businessName: businessDetails.businessName,
          businessEmail: businessDetails.businessEmail,
          businessPhone: businessDetails.businessPhone,
          businessAddress: businessDetails.businessAddress,
        },
      }], { session });

      await session.commitTransaction();
      console.log(newSeller)
      return newSeller;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
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
    // Merge nested objects properly
    const updatedData = {
      ...existingSeller.toObject(),
      ...sellerData,
      businessDetails: {
        ...existingSeller.businessDetails,
        ...sellerData.businessDetails,
      },
      bankDetails: {
        ...existingSeller.bankDetails,
        ...sellerData.bankDetails,
      },
    };

    return await Seller.findByIdAndUpdate(existingSeller._id, updatedData, {
      new: true,
      runValidators: true,
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
