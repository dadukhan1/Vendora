/** @format */

import { Seller } from "../models/Seller.js";
import { User } from "../models/User.js";
import { VerificationCode } from "../models/VerificationCode.js";
import generateOtp from "../utils/generateOtp.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import { Cart } from "../models/Cart.js";
import jwtProvider from "../utils/jwtProvider.js";

class AuthService {
  async sendSigninOtp(email) {

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Now check seller
    const seller = await Seller.findOne({ email });
    const user = await User.findOne({ email });
    // if (!seller && !user) throw new Error("User not found");

    const existingverificationCode = await VerificationCode.findOne({ email });

    if (existingverificationCode) {
      await VerificationCode.deleteOne({ email });
    }

    const otp = generateOtp();
    const verificationCode = new VerificationCode({ otp, email });
    await verificationCode.save();

    // send email to user
    const subject = "Vendora Signin/Signup OTP";
    const body = `Your OTP is ${otp}. Please enter it to complete the signin process.`;
    await sendVerificationEmail(email, subject, body);
  }

  async createUser(req) {
    const { email, fullName } = req.body;
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
    const { email, otp } = req.body;

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
      message: "Signin success",
      jwt: jwtProvider.createJwt({ email }),
      role: user.role,
    };
  }
}

export default new AuthService();
