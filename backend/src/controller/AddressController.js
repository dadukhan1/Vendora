/** @format */

import { Address } from "../models/Address.js";

export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addAddress = async (req, res) => {
  try {
    const { name, locality, pinCode, state, address, mobile } = req.body;

    const newAddress = new Address({
      user: req.user._id,
      name,
      locality,
      pinCode,
      state,
      address,
      mobile,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const address = await Address.findOneAndDelete({
      _id: addressId,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
