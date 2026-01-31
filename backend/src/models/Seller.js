/** @format */

import mongoose from "mongoose";
import { UserRoles } from "../domain/UserRoles.js";
import { AccountStatus } from "../domain/AccountStatus.js";

const sellerSchema = new mongoose.Schema(
  {
    sellerName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    businessDetails: {
      businessName: {
        type: String,
      },
      businessEmail: {
        type: String,
      },
      businessMobile: {
        type: String,
      },
      businessAddress: {
        type: String,
      },
    },
    bankDetails: {
      accountNumber: {
        type: String,
      },
      accountHolderName: {
        type: String,
      },
      bankName: {
        type: String,
      },
      ifscCode: {
        type: String,
      },
    },
    pickUpAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    GSTIN: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: UserRoles.SELLER,
    },
    accountStatus: {
      type: String,
      enum: [
        AccountStatus.PENDING_VERIFICATION,
        AccountStatus.ACTIVE,
        AccountStatus.SUSPENDED,
        AccountStatus.DEACTIVATED,
        AccountStatus.BANNED,
        AccountStatus.CLOSED,
      ],
      default: AccountStatus.PENDING_VERIFICATION,
    },
  },
  { timestamps: true },
);

export const Seller = mongoose.model("Seller", sellerSchema);
