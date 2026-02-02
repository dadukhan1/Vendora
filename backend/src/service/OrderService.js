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
      //   ADDRESS
      // create address if needed
      if (!shippingAddress._id) {
        shippingAddress = await Address.create([shippingAddress], { session });
        shippingAddress = shippingAddress[0];
      }

      // attach address to user if missing
      if (!user.addresses.includes(shippingAddress._id)) {
        user.addresses.push(shippingAddress._id);
        await user.save({ session });
      }

      //   GROUP ITEMS BY SELLER

      const itemsBySeller = cart.cartItems.reduce((acc, item) => {
        const sellerId = item.product.seller.toString();
        acc[sellerId] = acc[sellerId] || [];
        acc[sellerId].push(item);
        return acc;
      }, {});

      const orders = [];

      //   CREATE ORDERS
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

        // bulk insert order items
        const orderItems = await OrderItem.insertMany(orderItemsPayload, {
          session,
        });

        const order = await Order.create(
          [
            {
              user: user._id,
              seller: sellerId,
              shippingAddress: shippingAddress._id,
              orderItems: orderItems.map((i) => i._id),
              totalItems,
              totalMrpPrice,
              totalSellingPrice,
              discount: totalMrpPrice - totalSellingPrice,
            },
          ],
          { session },
        );

        orders.push(order[0]._id);
      }

      //   CLEAR CART
      cart.cartItems = [];
      await cart.save({ session });

      await session.commitTransaction();
      session.endSession();

      return orders;
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

    const orderItem = await OrderItem.findById(orderItemId);
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

  async updateOrderStatus(orderId, status) {
    if (!orderId) throw new Error("Order ID required");

    const allowedStatuses = [
      "PENDING",
      "PAID",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!allowedStatuses.includes(status)) {
      throw new Error("Invalid order status");
    }

    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    const invalidTransitions = {
      DELIVERED: ["PENDING", "PAID", "SHIPPED"],
      CANCELLED: ["PENDING", "PAID", "SHIPPED", "DELIVERED"],
    };

    if (invalidTransitions[order.status]?.includes(status)) {
      throw new Error(
        `Cannot change order status from ${order.status} to ${status}`,
      );
    }

    return await Order.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true, runValidators: true },
    )
      .populate([
        { path: "seller" },
        { path: "orderItems", populate: { path: "product" } },
        { path: "shippingAddress" },
      ])
      .exec();
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
      { $set: { status: OrderStatus.CANCELED } },
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
