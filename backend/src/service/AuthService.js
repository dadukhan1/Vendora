/** @format */

import { Seller } from "../models/Seller.js";
import { VerificationCode } from "../models/VerificationCode.js";
import generateOtp from "../utils/generateOtp.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

class AuthService {
  async sendLoginOtp(email) {
    const SIGNIN_PREFIX = "signin_";
    console.log(email);

    // Remove prefix first, before the if block
    if (email.startsWith(SIGNIN_PREFIX)) {
      email = email.substring(SIGNIN_PREFIX.length).trim();
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Now check seller
    const seller = await Seller.findOne({ email });
    if (!seller) throw new Error("User not found");

    const existingverificationCode = await VerificationCode.findOne({ email });

    if (existingverificationCode) {
      await VerificationCode.deleteOne({ email });
    }

    const otp = generateOtp();
    const verificationCode = new VerificationCode({ otp, email });
    await verificationCode.save();

    // send email to user
    const subject = "Vendora Login/Signup OTP";
    const body = `Your OTP is ${otp}. Please enter it to complete the login process.`;
    await sendVerificationEmail(email, subject, body);
  }
}

export default new AuthService();
