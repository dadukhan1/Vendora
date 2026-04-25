/** @format */

import { model, Schema } from "mongoose";

const bannerSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true, // For redirection on click
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Banner = model("Banner", bannerSchema);
