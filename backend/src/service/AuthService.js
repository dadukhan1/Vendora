/** @format */

import { Seller } from "../models/Seller.js";
import { User } from "../models/User.js";
import { VerificationCode } from "../models/VerificationCode.js";
import generateOtp from "../utils/generateOtp.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import { Cart } from "../models/Cart.js";
import jwtProvider from "../utils/jwtProvider.js";

class AuthService {
  async sendLoginOtp(email) {
    const SIGNIN_PREFIX = "signin_";

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
    const user = await User.findOne({ email });
    if (!seller && !user) throw new Error("User not found");

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

  async createUser(req) {
    const { email, fullName } = req;
    if (!email || !fullName) {
      throw new Error("All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with same email.");
    }

    const user = await User.create({
      email,
      fullName,
    });

    await Cart.create({ user: user._id });

    return jwtProvider.createJwt({ email });
  }

  async signIn(req) {
    const { email, otp } = req;

    if (!email || !otp) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }

    const verificationCode = await VerificationCode.findOne({ email });
    if (!verificationCode || verificationCode.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    await VerificationCode.deleteOne({ email });

    return {
      message: "Login success",
      jwt: jwtProvider.createJwt({ email }),
      role: user.role,
    };
  }
}

export default new AuthService();
