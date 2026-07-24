/** @format */

import OrderItemCard from "./OrderItemCard";
import { orderHistory } from "../../../Redux Toolkit/features/customer/orderSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";

const Order = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((store) => store.order);
  const orderList = (orders ?? []) as any[];

  useEffect(() => {
    dispatch(orderHistory(undefined as any));
  }, [dispatch]);

  return (
    <div style={{ minHeight: "100%", fontSize: 15, fontFamily: "Outfit, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 32,
          paddingBottom: 20,
          borderBottom: "1px solid #f0ece6",
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#0a0a0a",
            marginBottom: 6,
            fontFamily: "Outfit, sans-serif",
          }}
        >
          Order History
        </h1>
        <p style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>
          View and track your recent purchases.
        </p>
      </div>

      {/* Orders list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {loading && (
          <p style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>Loading your orders...</p>
        )}

        {!loading && error && (
          <p style={{ fontSize: 14, color: "#f43f5e", fontWeight: 500 }}>
            Could not load orders. Please refresh and try again.
          </p>
        )}

        {!loading && !error && (!orders || orders.length === 0) && (
          <div style={{ 
            padding: "48px 24px", 
            textAlign: "center", 
            background: "white", 
            borderRadius: "24px", 
            border: "1px solid #f0ece6" 
          }}>
            <p style={{ fontSize: 16, color: "#0a0a0a", fontWeight: 700, marginBottom: 8 }}>No orders found yet</p>
            <p style={{ fontSize: 14, color: "#9ca3af" }}>Looks like you haven't made any purchases yet.</p>
          </div>
        )}

        {!loading &&
          !error &&
          orderList?.map((order: any) =>
            (order?.orderItems ?? []).map((orderItem: any) => (
              <OrderItemCard
                orderItem={orderItem}
                order={order}
                key={`${order?._id}-${orderItem?._id}`}
              />
            )),
          )}
      </div>
    </div>
  );
};

export default Order;
