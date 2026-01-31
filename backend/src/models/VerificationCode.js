/** @format */

import mongoose, { Schema } from "mongoose";

const verificationCodeSchema = new Schema({
  otp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

export const VerificationCode = mongoose.model(
  "VerificationCode",
  verificationCodeSchema,
);
