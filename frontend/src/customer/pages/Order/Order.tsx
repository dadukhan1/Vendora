/** @format */

import { useNavigate } from "react-router";
import OrderItemCard from "./OrderItemCard";
import { useDispatch } from "react-redux";
import { orderHistory } from "../../../Redux Toolkit/features/customer/orderSlice";
import { useEffect } from "react";
import { useAppSelector } from "../../../Redux Toolkit/store";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(orderHistory());
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
        {orders?.map((order) =>
          order?.orderItems?.map((orderItem) => (
            <OrderItemCard
              orderItem={orderItem}
              order={order}
              key={orderItem._id}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default Order;
