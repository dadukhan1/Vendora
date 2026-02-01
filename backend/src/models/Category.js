/** @format */

import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
    categoryId: {
      type: String,
      unique: true,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Category = model("Category", categorySchema);
