/** @format */

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    name: String,
    locality: String,
    pinCode: Number,
    state: String,
    address: String,
    mobile: String,
  },
  { timestamps: true },
);

export const Address = mongoose.model("Address", addressSchema);
