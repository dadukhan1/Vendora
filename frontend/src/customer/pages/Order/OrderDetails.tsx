/** @format */

import {
  Payment,
  CheckCircle,
  AccessAlarm,
  TrendingDown,
} from "@mui/icons-material";
import { Box, Button, Divider, Chip } from "@mui/material";
import OrderStepper from "./OrderStepper";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { useEffect } from "react";
import {
  cancelOrder,
  orderById,
  orderItemById,
} from "../../../Redux Toolkit/features/customer/orderSlice";
import { useParams } from "react-router";

// Order status color mapping
const orderStatusColors: Record<
  string,
  { bg: string; text: string; icon: any }
> = {
  PENDING: { bg: "rgba(245,158,11,0.08)", text: "#d97706", icon: AccessAlarm },
  CONFIRMED: {
    bg: "rgba(59,130,246,0.08)",
    text: "#3b82f6",
    icon: CheckCircle,
  },
  PROCESSING: {
    bg: "rgba(245,158,11,0.08)",
    text: "#f59e0b",
    icon: AccessAlarm,
  },
  SHIPPED: { bg: "rgba(59,130,246,0.08)", text: "#3b82f6", icon: CheckCircle },
  DELIVERED: {
    bg: "rgba(16,184,129,0.08)",
    text: "#10b981",
    icon: CheckCircle,
  },
  CANCELLED: {
    bg: "rgba(239,68,68,0.08)",
    text: "#ef4444",
    icon: TrendingDown,
  },
};

const paymentStatusColors: Record<string, { bg: string; text: string }> = {
  PENDING: { bg: "rgba(245,158,11,0.08)", text: "#f59e0b" },
  COMPLETED: { bg: "rgba(16,184,129,0.08)", text: "#10b981" },
  FAILED: { bg: "rgba(239,68,68,0.08)", text: "#ef4444" },
};

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { orderItemId, orderId } = useParams();
  const { orderItem, currentOrder } = useAppSelector(
    (store) => store.order,
  ) as any;

  useEffect(() => {
    if (orderItemId) dispatch(orderItemById(orderItemId));
    if (orderId) dispatch(orderById(orderId));
  }, [orderItemId, orderId, dispatch]);

  const getOrderStatusColor = (status: string) => {
    return orderStatusColors[status] || orderStatusColors.PENDING;
  };

  const getPaymentStatusColor = (status: string) => {
    return paymentStatusColors[status] || paymentStatusColors.PENDING;
  };

  const orderCancelHanlder = (orderId: string) => {
    dispatch(cancelOrder(orderId));
  };
  const itemQuantity = Number(orderItem?.quantity ?? 1);
  const itemSellingTotal = Number(orderItem?.sellingPrice ?? 0) * itemQuantity;
  const orderShippingPrice = Number(currentOrder?.shippingPrice ?? 0);
  const orderCouponDiscount = Number(currentOrder?.couponDiscount ?? 0);
  const grossOrderSelling =
    Number(currentOrder?.totalSellingPrice ?? 0) - orderShippingPrice + orderCouponDiscount;
  const itemCouponShare =
    grossOrderSelling > 0
      ? (itemSellingTotal / grossOrderSelling) * orderCouponDiscount
      : 0;
  const itemPaidTotal = Number(
    Math.max(itemSellingTotal - itemCouponShare, 0).toFixed(2),
  );
  const itemShippingShare = grossOrderSelling > 0
    ? Number(((itemSellingTotal / grossOrderSelling) * orderShippingPrice).toFixed(2))
    : 0;
  const itemPaidTotalIncludingShipping = Number(
    (itemPaidTotal + itemShippingShare).toFixed(2),
  );
  const itemMrpTotal = Number(orderItem?.mrpPrice ?? 0) * itemQuantity;
  const itemSaved = Number(Math.max(itemMrpTotal - itemPaidTotal, 0).toFixed(2));

  const canCancelOrder = () => {
    return (
      currentOrder?.orderStatus === "PENDING" ||
      currentOrder?.orderStatus === "CONFIRMED"
    );
  };

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
            alt='Product'
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
            {currentOrder?.seller?.bussinessDetails?.bussinessName}
          </p>
          <p style={{ fontSize: 13, color: "#64748B", marginBottom: 4 }}>
            {orderItem?.product?.description}
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
            Size: {orderItem?.size}
          </span>
        </div>
      </section>

      {/* Stepper */}
      <section style={{ paddingBottom: 20, borderBottom: "1px solid #E2E8F0" }}>
        <OrderStepper orderStatus={currentOrder?.orderStatus} />
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
              {currentOrder?.shippingAddress?.mobile}
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
        {/* Order Status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 18px",
            borderBottom: "1px solid #E2E8F0",
            background: getOrderStatusColor(currentOrder?.orderStatus).bg,
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>
            Order Status
          </p>
          <Chip
            label={currentOrder?.orderStatus}
            sx={{
              background: getOrderStatusColor(currentOrder?.orderStatus).bg,
              color: getOrderStatusColor(currentOrder?.orderStatus).text,
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          />
        </div>

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
              Total Paid (Item + Delivery Share)
            </p>
            <p style={{ fontSize: 12, color: "#64748B" }}>
              You saved{" "}
              <span style={{ color: "#16a34a", fontWeight: 600 }}>
                ${itemSaved}{" "}
                on this item
              </span>
            </p>
            <p style={{ fontSize: 12, color: "#64748B" }}>Qty: {itemQuantity}</p>
            {itemShippingShare > 0 && (
              <p style={{ fontSize: 12, color: "#64748B" }}>
                Delivery share: ${itemShippingShare}
              </p>
            )}
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
            ${itemPaidTotalIncludingShipping}
          </p>
        </div>

        {/* Shipping Price row */}
        {orderShippingPrice > 0 && (
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
                Delivery Price (Order)
              </p>
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
              ${orderShippingPrice}
            </p>
          </div>
        )}

        {/* Payment method & status */}
        <div
          style={{ padding: "12px 18px", borderBottom: "1px solid #E2E8F0" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: getPaymentStatusColor(currentOrder?.paymentStatus).bg,
              border: `1px solid ${getPaymentStatusColor(currentOrder?.paymentStatus).text}33`,
              borderRadius: 10,
              padding: "10px 14px",
            }}
          >
            <Payment
              sx={{
                fontSize: 18,
                color: getPaymentStatusColor(currentOrder?.paymentStatus).text,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Show payment method based on paymentMethod field */}

              {/* Show status message based on paymentStatus */}
              <p style={{ fontSize: 11, color: "#64748B" }}>
                {
                  <>
                    Payment Status:{" "}
                    <span
                      style={{
                        fontWeight: 700,
                        color: getPaymentStatusColor(
                          currentOrder?.paymentStatus,
                        ).text,
                      }}
                    >
                      {currentOrder?.paymentStatus === "COMPLETED"
                        ? "Payment Successful"
                        : currentOrder?.paymentStatus === "PENDING" &&
                          "Pay on Delivery"}
                    </span>
                  </>
                }
              </p>
            </div>
          </div>
        </div>

        {/* Sold by */}
        <div
          style={{ padding: "12px 18px", borderBottom: "1px solid #E2E8F0" }}
        >
          <p style={{ fontSize: 12, color: "#64748B" }}>
            <span style={{ fontWeight: 700, color: "#0F172A" }}>Sold by: </span>
            {currentOrder?.seller?.sellerName}
          </p>
        </div>

        {/* Cancel button - only show if order can be cancelled */}
        {canCancelOrder() && (
          <div style={{ padding: "16px 18px" }}>
            <Button
              onClick={() => orderId && orderCancelHanlder(orderId)}
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
        )}

        {/* Info message if order cannot be cancelled */}
        {!canCancelOrder() && (
          <div
            style={{
              padding: "16px 18px",
              background: "rgba(59,130,246,0.05)",
              color: "#3b82f6",
              fontSize: 12,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            This order cannot be cancelled as it is already{" "}
            {currentOrder?.orderStatus}
          </div>
        )}
      </section>
    </Box>
  );
};

export default OrderDetails;
