/** @format */

import mongoose from "mongoose";
import { Address } from "../models/Address.js";
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { CartItem } from "../models/CartItem.js";
import { OrderStatus } from "../domain/OrderStatus.js";

class OrderService {
  async createOrder(user, shippingAddress, cart, couponDiscount = 0, couponId = null) {
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
        const sellerId = (item.product.seller._id).toString();
        acc[sellerId] = acc[sellerId] || [];
        acc[sellerId].push(item);
        return acc;
      }, {});

      const orders = [];
      const sellerEntries = Object.entries(itemsBySeller);
      const cartSellingGrossTotal = sellerEntries.reduce((sum, [, sellerItems]) => {
        const sellerSum = sellerItems.reduce(
          (subTotal, item) => subTotal + item.sellingPrice * item.quantity,
          0,
        );
        return sum + sellerSum;
      }, 0);
      const normalizedCouponDiscount = Math.max(
        Math.min(Number(couponDiscount) || 0, cartSellingGrossTotal),
        0,
      );
      const totalShippingFee = 299;
      let distributedDiscount = 0;
      let distributedShipping = 0;

      // Create orders per seller
      for (let index = 0; index < sellerEntries.length; index++) {
        const [sellerId, cartItems] = sellerEntries[index];
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
        let sellerCouponDiscount = 0;
        if (normalizedCouponDiscount > 0 && cartSellingGrossTotal > 0) {
          if (index === sellerEntries.length - 1) {
            sellerCouponDiscount = Number(
              (normalizedCouponDiscount - distributedDiscount).toFixed(2),
            );
          } else {
            sellerCouponDiscount = Number(
              (
                (totalSellingPrice / cartSellingGrossTotal) *
                normalizedCouponDiscount
              ).toFixed(2),
            );
          }
          sellerCouponDiscount = Math.min(sellerCouponDiscount, totalSellingPrice);
          distributedDiscount = Number(
            (distributedDiscount + sellerCouponDiscount).toFixed(2),
          );
        }
        const totalSellingAfterCoupon = Number(
          Math.max(totalSellingPrice - sellerCouponDiscount, 0).toFixed(2),
        );

        let sellerShippingFee = 0;
        if (cartSellingGrossTotal > 0) {
          if (index === sellerEntries.length - 1) {
            sellerShippingFee = Number(
              (totalShippingFee - distributedShipping).toFixed(2)
            );
          } else {
            sellerShippingFee = Number(
              ((totalSellingPrice / cartSellingGrossTotal) * totalShippingFee).toFixed(2)
            );
          }
          sellerShippingFee = Math.max(0, sellerShippingFee);
          distributedShipping += sellerShippingFee;
        } else {
          // If selling gross is 0 (free items?), just attach to first order if we want
          if (index === 0) {
            sellerShippingFee = totalShippingFee;
            distributedShipping = totalShippingFee;
          }
        }
        
        const totalSellingIncludingShipping = Number(
          (totalSellingAfterCoupon + sellerShippingFee).toFixed(2)
        );

        const order = await Order.create(
          [
            {
              user: user._id,
              seller: sellerId,
              shippingAddress: existingAddress._id,
              orderItems: orderItems.map((i) => i._id),
              totalItems,
              totalMrpPrice,
              totalSellingPrice: totalSellingIncludingShipping,
              couponDiscount: sellerCouponDiscount,
              couponId: couponId || undefined,
              shippingPrice: sellerShippingFee,
              discount: Number(
                Math.max(totalMrpPrice - totalSellingAfterCoupon, 0).toFixed(2),
              ),
            },
          ],
          { session },
        );

        orders.push(order[0]);
      }

      // Clear cart
      await CartItem.deleteMany({ cart: cart._id }, { session });
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
