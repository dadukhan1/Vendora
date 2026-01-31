/** @format */

import { model } from "mongoose";
import { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartItems",
      },
    ],
    totalSellingPrice: {
      type: Number,
      default: 0,
    },
    totlaItems: {
      type: Number,
      default: 0,
    },
    totalMrpPrice: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    couponCode: {
      type: Number,
      default: 0,
    },
    couponPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Cart = model("Cart", cartSchema);
