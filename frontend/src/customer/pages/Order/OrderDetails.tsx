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
import { useNavigate, useParams } from "react-router";

const GOLD = "#c9993a";
const DARK = "#0a0a0a";

// Order status color mapping
const orderStatusColors: Record<
  string,
  { bg: string; text: string; icon: any }
> = {
  PENDING: { bg: "rgba(201,153,58,0.12)", text: GOLD, icon: AccessAlarm },
  CONFIRMED: { bg: "rgba(201,153,58,0.12)", text: GOLD, icon: CheckCircle },
  PROCESSING: { bg: "rgba(201,153,58,0.12)", text: GOLD, icon: AccessAlarm },
  SHIPPED: { bg: "rgba(225,29,72,0.08)", text: "#e11d48", icon: CheckCircle },
  DELIVERED: { bg: "rgba(5,150,105,0.08)", text: "#059669", icon: CheckCircle },
  CANCELLED: { bg: "rgba(244,63,94,0.08)", text: "#f43f5e", icon: TrendingDown },
};

const paymentStatusColors: Record<string, { bg: string; text: string }> = {
  PENDING: { bg: "rgba(201,153,58,0.12)", text: GOLD },
  COMPLETED: { bg: "rgba(5,150,105,0.08)", text: "#059669" },
  FAILED: { bg: "rgba(244,63,94,0.08)", text: "#f43f5e" },
};

const OrderDetails = () => {
  const navigate = useNavigate();
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
    <Box style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: "Outfit, sans-serif" }}>
      {/* Product snapshot (Editorial Layout) */}
      <section
        style={{
          display: "flex",
          gap: 32,
          paddingBottom: 32,
          borderBottom: "1px solid #f0ece6",
          alignItems: "flex-start",
        }}
      >
        <div
          onClick={() => navigate(`/product-details/${orderItem?.product?.category}/${orderItem?.product?.title}/${orderItem?.product?._id}`)}
          style={{
            width: 160,
            height: 200,
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #f0ece6",
            background: "#fafaf8",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <img
            src={orderItem?.product?.images[0]}
            alt='Product'
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          />
        </div>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {currentOrder?.seller?.businessDetails?.businessName || currentOrder?.seller?.sellerName}
          </p>
          <p
            onClick={() => navigate(`/product-details/${orderItem?.product?.category}/${orderItem?.product?.title}/${orderItem?.product?._id}`)}
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: DARK,
              lineHeight: 1.2,
              cursor: "pointer",
              fontFamily: "Outfit, sans-serif",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
            onMouseLeave={(e) => e.currentTarget.style.color = DARK}
          >
            {orderItem?.product?.title}
          </p>
          <p style={{ fontSize: 14, color: "#5d5d5d", lineHeight: 1.6, fontFamily: "Outfit, sans-serif" }}>
            {orderItem?.product?.description}
          </p>
          
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
             <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: 12,
                fontWeight: 700,
                color: GOLD,
                background: "linear-gradient(135deg, #fffcf5 0%, #fff6e5 100%)",
                border: "1px solid #fde6b3",
                padding: "6px 16px",
                borderRadius: "99px",
                fontFamily: "Outfit, sans-serif",
                height: 32,
              }}
            >
              Size: {orderItem?.size}
            </span>
            
            <Button
              onClick={() => navigate(`/product-details/${orderItem?.product?.category}/${orderItem?.product?.title}/${orderItem?.product?._id}`)}
              variant="contained"
              sx={{
                background: DARK,
                color: "white",
                textTransform: "none",
                fontSize: "0.85rem",
                fontWeight: 700,
                fontFamily: "Outfit, sans-serif",
                borderRadius: "99px",
                px: 3,
                height: 32,
                boxShadow: "0 4px 12px rgba(10,10,10,0.15)",
                "&:hover": {
                  background: GOLD,
                  boxShadow: "0 4px 16px rgba(201,153,58,0.3)",
                }
              }}
            >
              View Product
            </Button>
          </div>
        </div>
      </section>

      {/* Stepper */}
      <section style={{ paddingBottom: 32, borderBottom: "1px dashed #e5e7eb" }}>
        <OrderStepper orderStatus={currentOrder?.orderStatus} />
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Delivery address */}
        <section>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: DARK,
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Delivery Address
          </h2>
          <div style={{ 
            background: "#fafaf8", 
            border: "1px solid #f0ece6", 
            borderRadius: "16px", 
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 12
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 4, height: 16, background: GOLD, borderRadius: 4 }} />
              <p style={{ fontSize: 15, fontWeight: 700, color: DARK, fontFamily: "Outfit, sans-serif" }}>
                Phone: {currentOrder?.shippingAddress?.mobile}
              </p>
            </div>
            <p style={{ fontSize: 14, color: "#5d5d5d", lineHeight: 1.6, fontFamily: "Outfit, sans-serif" }}>
              {currentOrder?.shippingAddress?.address} <br/>
              {currentOrder?.shippingAddress?.locality}, {currentOrder?.shippingAddress?.city} <br/>
              {currentOrder?.shippingAddress?.state} {currentOrder?.shippingAddress?.pinCode}
            </p>
          </div>
        </section>

        {/* Order Summary & Payment */}
        <section>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: DARK,
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Order Summary
          </h2>
          <div
            style={{
              border: "1px solid #f0ece6",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            {/* Status Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px",
                borderBottom: "1px solid #f0ece6",
                background: getOrderStatusColor(currentOrder?.orderStatus).bg,
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 800, color: DARK, fontFamily: "Outfit, sans-serif" }}>
                Status
              </p>
              <div
                style={{
                  background: "transparent",
                  color: getOrderStatusColor(currentOrder?.orderStatus).text,
                  fontWeight: 800,
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "Outfit, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: getOrderStatusColor(currentOrder?.orderStatus).text }} />
                {currentOrder?.orderStatus}
              </div>
            </div>

            {/* Price Details */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0ece6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                 <p style={{ fontSize: 14, color: "#5d5d5d", fontFamily: "Outfit, sans-serif" }}>Item Total (Qty: {itemQuantity})</p>
                 <p style={{ fontSize: 14, fontWeight: 700, color: DARK, fontFamily: "Outfit, sans-serif" }}>${itemPaidTotal}</p>
              </div>
              
              {itemShippingShare > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                   <p style={{ fontSize: 14, color: "#5d5d5d", fontFamily: "Outfit, sans-serif" }}>Delivery Share</p>
                   <p style={{ fontSize: 14, fontWeight: 700, color: DARK, fontFamily: "Outfit, sans-serif" }}>${itemShippingShare}</p>
                </div>
              )}

              {itemSaved > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                   <p style={{ fontSize: 14, color: "#059669", fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>Savings</p>
                   <p style={{ fontSize: 14, fontWeight: 700, color: "#059669", fontFamily: "Outfit, sans-serif" }}>-${itemSaved}</p>
                </div>
              )}

              <div style={{ paddingTop: 16, borderTop: "1px dashed #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <p style={{ fontSize: 15, fontWeight: 800, color: DARK, fontFamily: "Outfit, sans-serif" }}>Total Paid</p>
                 <p style={{ fontSize: 20, fontWeight: 800, color: DARK, fontFamily: "Outfit, sans-serif" }}>${itemPaidTotalIncludingShipping}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div style={{ padding: "20px 24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: getPaymentStatusColor(currentOrder?.paymentStatus).bg,
                  borderRadius: "12px",
                  padding: "12px 16px",
                }}
              >
                <Payment
                  sx={{
                    fontSize: 20,
                    color: getPaymentStatusColor(currentOrder?.paymentStatus).text,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: 12, color: "#5d5d5d", fontFamily: "Outfit, sans-serif" }}>Payment Status</p>
                  <p style={{ 
                    fontSize: 14, 
                    fontWeight: 700, 
                    color: getPaymentStatusColor(currentOrder?.paymentStatus).text,
                    fontFamily: "Outfit, sans-serif"
                  }}>
                    {currentOrder?.paymentStatus === "COMPLETED"
                        ? "Successful"
                        : currentOrder?.paymentStatus === "PENDING" &&
                        "Pay on Delivery"}
                  </p>
                </div>
              </div>
            </div>

          </div>
          
          {/* Actions */}
          <div style={{ marginTop: 24 }}>
            {canCancelOrder() ? (
              <Button
                onClick={() => orderId && orderCancelHanlder(orderId)}
                fullWidth
                variant='outlined'
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderRadius: "12px",
                  borderColor: "#f43f5e",
                  color: "#f43f5e",
                  fontSize: 13,
                  fontWeight: 800,
                  fontFamily: "Outfit, sans-serif",
                  py: 1.5,
                  "&:hover": {
                    borderColor: "#e11d48",
                    background: "rgba(244, 63, 94, 0.08)",
                  },
                }}
              >
                Cancel Order
              </Button>
            ) : (
              <div
                style={{
                  padding: "16px",
                  background: "#f3f4f6",
                  color: "#9ca3af",
                  borderRadius: "12px",
                  fontSize: 13,
                  fontWeight: 600,
                  textAlign: "center",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                Cancellation unavailable (Order is {currentOrder?.orderStatus})
              </div>
            )}
          </div>
        </section>
      </div>
    </Box>
  );
};

export default OrderDetails;
