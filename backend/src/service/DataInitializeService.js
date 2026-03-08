/** @format */

import { User } from "../models/User.js";
import bcrypt from "bcrypt";

class DataInitializeService {
  async initializeAdminUser() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
      const adminExists = await User.findOne({ email: adminEmail });

      if (adminExists) {
        console.log("Admin user already exists");
        return;
      }

      // Hash password
      const hashedPassword = bcrypt.hash(adminPassword, 10);

      await User.create({
        fullName: "Dadu Khan",
        email: adminEmail,
        password: hashedPassword,
        role: "ROLE_ADMIN",
      });

      console.log("Admin user created successfully!");
    } catch (error) {
      console.log("Error during admin initialization!", error);
    }
  }
}

export default new DataInitializeService();
