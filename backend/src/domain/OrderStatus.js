/** @format */

// orderStatus.js
export const OrderStatus = {
  PENDING: "PENDING", // Order placed, awaiting payment
  CONFIRMED: "CONFIRMED", // Payment received, seller confirms
  PROCESSING: "PROCESSING", // Seller preparing order
  SHIPPED: "SHIPPED", // Order shipped
  DELIVERED: "DELIVERED", // Order delivered
  CANCELLED: "CANCELLED", // Order cancelled
};
