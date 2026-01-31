/** @format */

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    locality: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Address = mongoose.model("Address", addressSchema);
