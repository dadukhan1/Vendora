/** @format */

import { Payment } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import OrderStepper from "./OrderStepper";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { useEffect } from "react";
import {
  orderById,
  orderItemById,
} from "../../../Redux Toolkit/features/customer/orderSlice";
import { useParams } from "react-router";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { orderItemId, orderId } = useParams();
  const { orderItem, currentOrder } = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(orderItemById(orderItemId));
    dispatch(orderById(orderId));
  }, []);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Product snapshot */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          paddingBottom: 20,
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            width: 120,
            height: 140,
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #E2E8F0",
          }}
        >
          <img
            src={orderItem?.product?.images[0]}
            alt=''
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#0F172A",
              marginBottom: 4,
            }}
          >
            Rana g store
          </p>
          <p style={{ fontSize: 13, color: "#64748B", marginBottom: 4 }}>
            Turquoise Blue Stonework Satin Designer saree
          </p>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 600,
              color: "#0F52FF",
              background: "rgba(15,82,255,0.08)",
              padding: "2px 10px",
              borderRadius: 99,
            }}
          >
            Size: FREE
          </span>
        </div>
      </section>

      {/* Stepper */}
      <section style={{ paddingBottom: 20, borderBottom: "1px solid #E2E8F0" }}>
        <OrderStepper />
      </section>

      {/* Delivery address */}
      <section style={{ paddingBottom: 20, borderBottom: "1px solid #E2E8F0" }}>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#0F172A",
            marginBottom: 12,
          }}
        >
          Delivery Address
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Divider flexItem orientation='vertical' />
            <p style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>
              0876786780
            </p>
          </div>
          <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>
            {currentOrder?.shippingAddress?.address}{" "}
            {currentOrder?.shippingAddress?.locality}{" "}
            {currentOrder?.shippingAddress?.city}{" "}
            {currentOrder?.shippingAddress?.state}{" "}
            {currentOrder?.shippingAddress?.pinCode}
          </p>
        </div>
      </section>

      {/* Price & payment */}
      <section
        style={{
          border: "1px solid #E2E8F0",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {/* Price row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "16px 18px",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>
              Total Item Price
            </p>
            <p style={{ fontSize: 12, color: "#64748B" }}>
              You saved{" "}
              <span style={{ color: "#16a34a", fontWeight: 600 }}>
                ₹{currentOrder?.mrpPrice - currentOrder?.totalSellingPrice} on
                this item
              </span>
            </p>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
            ₹{currentOrder?.totalSellingPrice}
          </p>
        </div>

        {/* Payment method */}
        <div
          style={{ padding: "12px 18px", borderBottom: "1px solid #E2E8F0" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(15,82,255,0.05)",
              border: "1px solid rgba(15,82,255,0.15)",
              borderRadius: 10,
              padding: "10px 14px",
            }}
          >
            <Payment sx={{ fontSize: 18, color: "#0F52FF" }} />
            <p style={{ fontSize: 12, fontWeight: 600, color: "#0F52FF" }}>
              Pay on Delivery
            </p>
          </div>
        </div>

        {/* Sold by */}
        <div
          style={{ padding: "12px 18px", borderBottom: "1px solid #E2E8F0" }}
        >
          <p style={{ fontSize: 12, color: "#64748B" }}>
            <span style={{ fontWeight: 700, color: "#0F172A" }}>Sold by: </span>
            Pablo Clothing
          </p>
        </div>

        {/* Cancel button */}
        <div style={{ padding: "16px 18px" }}>
          <Button
            fullWidth
            variant='outlined'
            sx={{
              textTransform: "none",
              borderRadius: "99px",
              borderColor: "#FF4F00",
              color: "#FF4F00",
              fontSize: 13,
              fontWeight: 600,
              py: 1,
              "&:hover": {
                borderColor: "#FF4F00",
                background: "rgba(255,79,0,0.05)",
              },
            }}
          >
            Cancel Order
          </Button>
        </div>
      </section>
    </Box>
  );
};

export default OrderDetails;
