/** @format */

import { model, Schema } from "mongoose";
import HomeCategorySection from "../domain/HomeCategorySection";

const homeCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      enum: Object.values(HomeCategorySection),
      required: true,
    },
  },
  { timestamps: true },
);

export const HomeCategory = model("HomeCategory", homeCategorySchema);
