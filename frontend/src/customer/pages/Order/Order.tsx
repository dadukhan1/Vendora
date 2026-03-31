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
    <div style={{ minHeight: "100%", fontSize: 14 }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <h1
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#0F172A",
            marginBottom: 4,
          }}
        >
          All Orders
        </h1>
        <p style={{ fontSize: 13, color: "#94A3B8" }}>From anytime</p>
      </div>

      {/* Orders list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {loading && (
          <p style={{ fontSize: 13, color: "#64748B" }}>Loading orders...</p>
        )}

        {!loading && error && (
          <p style={{ fontSize: 13, color: "#dc2626" }}>
            Could not load orders. Please refresh and try again.
          </p>
        )}

        {!loading && !error && (!orders || orders.length === 0) && (
          <p style={{ fontSize: 13, color: "#64748B" }}>No orders found yet.</p>
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
