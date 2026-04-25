/** @format */

import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    level: {
      type: Number,
      default: 1, // 1 for root, 2 for sub, etc.
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Pre-save hook to calculate level and enforce max depth of 3
categorySchema.pre("save", async function () {
  if (this.parentCategory) {
    try {
      const parent = await model("Category").findById(this.parentCategory);
      if (parent) {
        if (parent.level >= 3) {
          throw new Error("Maximum category depth exceeded. You cannot add children to level 3 categories.");
        }
        this.level = (parent.level || 1) + 1;
      } else {
        this.level = 1;
        this.parentCategory = null;
      }
    } catch (err) {
      if (err.message.includes("Maximum category depth")) throw err;
      this.level = 1;
      this.parentCategory = null;
    }
  } else {
    this.level = 1;
  }
});

export const Category = model("Category", categorySchema);
