/** @format */

import { model, Schema } from "mongoose";
import { UserRoles } from "../domain/UserRoles.js";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
  },
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  role: {
    type: String,
    enum: [UserRoles.CUSTOMER, UserRoles.ADMIN],
    default: UserRoles.CUSTOMER,
  },
});

export const User = model("User", userSchema);
