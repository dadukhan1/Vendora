/** @format */

import mongoose from "mongoose";
import DataInitializeService from "../service/DataInitializeService.js";

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    DataInitializeService.initializeAdminUser();
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`MongoDB error: ${error.message}`);
    process.exit(1);
  }
};

export default connectToDB;
