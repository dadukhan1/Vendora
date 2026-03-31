/** @format */

import stripe from "stripe";
import { Order } from "../models/Order.js";
import { Transaction } from "../models/Transaction.js";
import { PaymentStatus } from "../domain/PaymentStatus.js";
import { OrderStatus } from "../domain/OrderStatus.js";
import { markCouponUsed } from "./CouponController.js";

export const stripeWebhooks = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRETT,
    );
  } catch (error) {
    console.error("Webhook signature failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Checkout success
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderIdStr = session.metadata.orderId;
    if (!orderIdStr) {
      return res.status(400).send("Order IDs missing in session metadata");
    }

    const orderIds = orderIdStr.split(",");

    for (const orderId of orderIds) {
      const order = await Order.findById(orderId.trim());

      if (!order) {
        console.error("Order not found:", orderId);
        continue;
      }

      // Update Order
      order.paymentStatus = PaymentStatus.COMPLETED;
      order.orderStatus = OrderStatus.PLACED;
      await order.save();

      if (order.couponId) {
        await markCouponUsed(order.couponId, order.user);
      }

      // Create Transaction
      console.log("order done for:", orderId)
      await Transaction.create({
        user: order.user,
        order: order._id,
        seller: order.seller,
        amount: order.totalSellingPrice,
        type: "CREDIT",
        status: PaymentStatus.COMPLETED,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
      });

      console.log("Order & Transaction updated:", orderId);
    }
  }

  res.status(200).json({ received: true });
};
