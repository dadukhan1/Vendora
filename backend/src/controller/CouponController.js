/** @format */

import { Coupon } from "../models/Coupon.js";

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountPercentage,
      validityStartDate,
      validityEndDate,
      minimumOrderValue,
    } = req.body;

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
    res.status(500).json({ message: error.message });
  }
};

// Apply coupon (User)
export const applyCoupon = async (req, res) => {
  try {
    const { couponCode, cartTotal } = req.body;
    const userId = req.user._id; // assuming auth middleware

    const coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
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

// Delete coupon (Admin)
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await coupon.deleteOne(); // or Coupon.findByIdAndDelete(id)
    res.status(200).json({ message: "Coupon deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
