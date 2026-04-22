/** @format */

import { model, Schema } from "mongoose";

const dealSchema = new Schema({
  discount: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    // type: String,
    ref: "HomeCategory",
    required: true,
  },
});

export const Deal = model("Deal", dealSchema);
