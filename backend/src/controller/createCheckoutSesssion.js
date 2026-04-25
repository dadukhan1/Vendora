/** @format */

import stripe from "stripe";
import { Order } from "../models/Order.js";

export const createCheckoutSession = async (req, res) => {
  console.log("\nStripe checkout session start\n");

  try {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const { orderId, totalSellingPrice } = req.body;

    if (!orderId || !totalSellingPrice) {
      return res
        .status(400)
        .json({ error: "orderId and totalSellingPrice are required" });
    }

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Vendora Order" },
            unit_amount: Math.round(totalSellingPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: { orderId }, // webhook mein order ID milega
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
