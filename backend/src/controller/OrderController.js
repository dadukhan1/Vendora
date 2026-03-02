/** @format */

import { OrderStatus } from "../domain/OrderStatus.js";
import CartService from "../service/CartService.js";
import OrderService from "../service/OrderService.js";

class OrderController {
  async createOrder(req, res) {
    const { shippingAddress } = req.body;
    const { paymentMethod } = req.params;
    const jwt = req.headers.authorization;

    try {
      const user = req.user;

      const cart = await CartService.findUserCart(user);
      const orders = await OrderService.createOrder(
        user,
        shippingAddress,
        cart,
      );
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: `Error in creating order: ${error.message}` });
    }
  }

  async getOrderById(req, res) {
    try {
      const { orderId } = req.params;
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }

      const order = await OrderService.findOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getItemById(req, res) {
    try {
      const { orderItemId } = req.params;
      console.log(orderItemId);
      if (!orderItemId) {
        return res.status(400).json({ message: "OrderItem ID is required" });
      }

      const orderItem = await OrderService.findOrderItemById(orderItemId);
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }

      return res.status(200).json(orderItem);
    } catch (error) {
      console.log("get item by id erro", error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async getSellerOrders(req, res) {
    try {
      const sellerId = req.seller._id;

      if (!sellerId) {
        return res.status(400).json({ message: "Seller ID is required" });
      }

      const orders = await OrderService.sellerOrderHistory(sellerId);

      return res.status(200).json({
        totalOrders: orders.length,
        orders,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const userId = req.user._id; // authenticated user

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const orders = await OrderService.userOrderHistory(userId);

      return res.status(200).json({
        totalOrders: orders.length,
        orders,
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  // OrderController.js

  async updateOrderStatus(req, res) {
    try {
      const { orderId, orderStatus } = req.params;

      // Sanitize: trim + uppercase + map to enum
      const statusMap = {
        placed: OrderStatus.PLACED,
        pending: OrderStatus.PENDING,
        paid: OrderStatus.PAID,
        shipped: OrderStatus.SHIPPED,
        delivered: OrderStatus.DELIVERED,
        cancelled: OrderStatus.CANCELLED,
      };

      const sanitizedStatus = statusMap[orderStatus.toLowerCase().trim()];
      if (!sanitizedStatus) throw new Error("Invalid order status");

      const updatedOrder = await OrderService.updateOrderStatus(
        orderId,
        sanitizedStatus,
      );

      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async cancelOrder(req, res) {
    try {
      const { orderId } = req.params;
      const userId = req.user._id;
      const canceledOrder = await OrderService.cancelOrder(orderId, userId);
      return res.status(200).json({
        message: "Order deleted successfully",
        order: canceledOrder,
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new OrderController();
