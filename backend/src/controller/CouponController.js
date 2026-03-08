/** @format */

import { Coupon } from "../models/Coupon.js";

export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountPercentage,
      validityStartDate,
      validityEndDate,
      minimumOrderValue,
    } = req.body;
    console.log(
      "checking ---------------------------------------",
      code,
      discountPercentage,
      validityStartDate,
      validityEndDate,
      minimumOrderValue,
    );

    const startDate = new Date(validityStartDate);
    const endDate = new Date(validityEndDate);

    if (
      !code ||
      discountPercentage == null ||
      isNaN(startDate) ||
      isNaN(endDate)
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountPercentage,
      validityStartDate: startDate,
      validityEndDate: endDate,
      minimumOrderValue,
    });

    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Apply coupon (User)
export const applyCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    const userId = req.user._id; // assuming auth middleware

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });
    if (!coupon) return res.status(400).json({ message: "Invalid coupon" });

    const now = new Date();
    if (now < coupon.validityStartDate || now > coupon.validityEndDate) {
      return res.status(400).json({ message: "Coupon is not valid now" });
    }

    if (cartTotal < coupon.minimumOrderValue) {
      return res.status(400).json({
        message: `Minimum order value for this coupon is ${coupon.minimumOrderValue}`,
      });
    }

    if (coupon.usedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already used this coupon" });
    }

    const discount = (cartTotal * coupon.discountPercentage) / 100;
    const finalAmount = cartTotal - discount;

    res.status(200).json({
      message: "Coupon applied successfully",
      discount,
      finalAmount,
      couponId: coupon._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark coupon as used (call after payment)
export const markCouponUsed = async (couponId, userId) => {
  await Coupon.findByIdAndUpdate(couponId, { $push: { usedBy: userId } });
};
