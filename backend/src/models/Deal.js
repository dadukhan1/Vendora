/** @format */

import { model, Schema } from "mongoose";

const dealSchema = new Schema({
  discount: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "HomeCategory",
    required: true,
  },
});

export const Deal = model("Deal", dealSchema);
