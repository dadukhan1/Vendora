/** @format */

import { Order } from "../models/Order.js";
import { Transaction } from "../models/Transaction.js";

class TransactionService {
  async createTransaction(orderId) {
    const order = await Order.findById(orderId).populate("seller");
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status !== "PAID") {
      throw new Error("Transaction can only be created for paid orders");
    }

    if (!order.user) {
      throw new Error("Customer not found");
    }

    const seller = order.seller;
    if (!seller) {
      throw new Error("Seller not found");
    }

    const existing = await Transaction.findOne({ order: order._id });
    if (existing) {
      throw new Error("Transaction already exists for this order");
    }

    const transaction = await Transaction.create({
      seller: seller._id,
      customer: order.user,
      order: order._id,
    });

    return transaction;
  }

  async getTransactionBySellerId(sellerId) {
    return await Transaction.find({ seller: sellerId }).populate("order");
  }
  async getAllTransactions() {
    return await Transaction.find().populate("seller order customer");
  }
}

export default new TransactionService();
