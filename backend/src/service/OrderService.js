/** @format */

import mongoose from "mongoose";
import { Address } from "../models/Address.js";
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { OrderStatus } from "../domain/OrderStatus.js";

class OrderService {
  async createOrder(user, shippingAddress, cart) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check if address already exists
      let existingAddress = await Address.findOne({
        _id: shippingAddress,
      }).session(session);

      // Create address if it doesn't exist
      if (!existingAddress) {
        console.log(
          "Address not found. Creating new shipping address:",
          shippingAddress,
        );
        existingAddress = await Address.create(shippingAddress, { session });
        existingAddress = existingAddress[0]; // create returns an array
      }

      // Attach address to user if missing
      if (!user.addresses.includes(existingAddress._id)) {
        user.addresses.push(existingAddress._id);
        await user.save({ session });
      }

      // Group items by seller
      const itemsBySeller = cart.cartItems.reduce((acc, item) => {
        const sellerId = item.product.seller.toString();
        acc[sellerId] = acc[sellerId] || [];
        acc[sellerId].push(item);
        return acc;
      }, {});

      const orders = [];

      // Create orders per seller
      for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
        let totalSellingPrice = 0;
        let totalMrpPrice = 0;
        let totalItems = 0;

        const orderItemsPayload = cartItems.map((item) => {
          totalSellingPrice += item.sellingPrice * item.quantity;
          totalMrpPrice += item.mrpPrice * item.quantity;
          totalItems += item.quantity;

          return {
            product: item.product._id,
            quantity: item.quantity,
            sellingPrice: item.sellingPrice,
            mrpPrice: item.mrpPrice,
            size: item.size,
          };
        });

        // Bulk insert order items
        const orderItems = await OrderItem.insertMany(orderItemsPayload, {
          session,
        });

        const order = await Order.create(
          [
            {
              user: user._id,
              seller: sellerId,
              shippingAddress: existingAddress._id,
              orderItems: orderItems.map((i) => i._id),
              totalItems,
              totalMrpPrice,
              totalSellingPrice,
              discount: totalMrpPrice - totalSellingPrice,
            },
          ],
          { session },
        );

        orders.push(order[0]);
      }

      // Clear cart
      cart.cartItems = [];
      await cart.save({ session });

      await session.commitTransaction();
      session.endSession();

      return orders[0];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async findOrderById(orderId) {
    if (!mongoose.Types.ObjectId.isValid(orderId))
      throw new Error("Invalid Order ID");

    const order = await Order.findById(orderId)
      .populate([
        { path: "seller" },
        { path: "orderItems", populate: { path: "product" } },
        { path: "shippingAddress" },
      ])
      .exec();

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  async findOrderItemById(orderItemId) {
    if (!mongoose.Types.ObjectId.isValid(orderItemId)) {
      throw new Error("Invalid Order Item Id");
    }

    const orderItem = await OrderItem.findById(orderItemId).populate("product");
    if (!orderItem) {
      throw new Error("Order Item not found");
    }
    return orderItem;
  }

  async userOrderHistory(userId) {
    return await Order.find({ user: userId })
      .populate([
        { path: "seller" },
        { path: "orderItems", populate: { path: "product" } },
        { path: "shippingAddress" },
      ])
      .sort({ createdAt: -1 })
      .exec();
  }

  async sellerOrderHistory(sellerId) {
    return await Order.find({ seller: sellerId })
      .sort({ orderDate: -1 })
      .populate([
        { path: "seller" },
        { path: "orderItems", populate: { path: "product" } },
        { path: "shippingAddress" },
      ])
      .exec();
  }

  async updateOrderStatus(orderId, newStatus) {
    if (!orderId) throw new Error("Order ID is required");

    const statusMap = {
      pending: "PENDING",
      confirmed: "CONFIRMED",
      processing: "PROCESSING",
      shipped: "SHIPPED",
      delivered: "DELIVERED",
      cancelled: "CANCELLED",
    };

    console.log(newStatus);
    const sanitizedStatus = statusMap[newStatus.toLowerCase().trim()];
    if (!sanitizedStatus) throw new Error("Invalid order status");

    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    const allowedTransitions = {
      PENDING: ["CONFIRMED", "CANCELLED"],
      CONFIRMED: ["PROCESSING", "CANCELLED"],
      PROCESSING: ["SHIPPED"],
      SHIPPED: ["DELIVERED"],
      DELIVERED: [],
      CANCELLED: [],
    };

    const currentStatus = order.orderStatus;

    if (!allowedTransitions[currentStatus]?.includes(sanitizedStatus)) {
      throw new Error(
        `Cannot change status from ${currentStatus} to ${sanitizedStatus}`,
      );
    }

    if (
      sanitizedStatus === "CONFIRMED" &&
      order.paymentStatus !== "COMPLETED" &&
      order.paymentMethod !== "POD"
    ) {
      throw new Error("Payment not completed. Cannot confirm order.");
    }

    order.orderStatus = sanitizedStatus;
    await order.save();

    // Return populated order
    return await Order.findById(orderId)
      .populate("seller")
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress");
  }

  async cancelOrder(orderId) {
    if (!orderId) throw new Error("Order ID required");

    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    if (["DELIVERED", "CANCELLED"].includes(order.status)) {
      throw new Error("Order cannot be cancelled");
    }

    return await Order.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus: OrderStatus.CANCELLED } },
      { new: true, runValidators: true },
    )
      .populate([
        { path: "seller" },
        { path: "orderItems", populate: { path: "product" } },
        { path: "shippingAddress" },
      ])
      .exec();
  }
}

export default new OrderService();
