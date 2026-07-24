/** @format */

import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router";

const GOLD = "#c9993a";
const DARK = "#0a0a0a";

const statusColors: Record<string, { color: string; bg: string }> = {
  PENDING: { color: GOLD, bg: "rgba(201,153,58,0.12)" },
  PLACED: { color: GOLD, bg: "rgba(201,153,58,0.12)" },
  CONFIRMED: { color: GOLD, bg: "rgba(201,153,58,0.12)" },
  PROCESSING: { color: GOLD, bg: "rgba(201,153,58,0.12)" },
  SHIPPED: { color: "#e11d48", bg: "rgba(225,29,72,0.08)" },
  ARRIVING: { color: "#e11d48", bg: "rgba(225,29,72,0.08)" },
  DELIVERED: { color: "#059669", bg: "rgba(5,150,105,0.08)" },
  CANCELLED: { color: "#f43f5e", bg: "rgba(244,63,94,0.08)" },
};

type OrderItemCardProps = {
  orderItem: any;
  order: any;
};

const OrderItemCard = ({ orderItem, order }: OrderItemCardProps) => {
  const navigate = useNavigate();
  const status = statusColors[order?.orderStatus] ?? statusColors.PLACED;
  const deliveryLabel = order?.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString()
    : "N/A";
  const quantity = Number(orderItem?.quantity ?? 1);
  const itemTotal = Number(orderItem?.sellingPrice ?? 0) * quantity;
  const orderCouponDiscount = Number(order?.couponDiscount ?? 0);
  const orderShippingPrice = Number(order?.shippingPrice ?? 0);
  const grossOrderSelling = Number(order?.totalSellingPrice ?? 0) - orderShippingPrice + orderCouponDiscount;
  const itemCouponShare =
    grossOrderSelling > 0
      ? (itemTotal / grossOrderSelling) * orderCouponDiscount
      : 0;
  const paidItemTotal = Number(Math.max(itemTotal - itemCouponShare, 0).toFixed(2));
  const itemShippingShare = grossOrderSelling > 0
    ? Number(((itemTotal / grossOrderSelling) * orderShippingPrice).toFixed(2))
    : 0;
  const paidItemTotalIncludingShipping = Number(
    (paidItemTotal + itemShippingShare).toFixed(2),
  );

  return (
    <div
      onClick={() =>
        navigate(`/account/orders/${order._id}/item/${orderItem._id}`)
      }
      style={{
        background: "#fff",
        border: "1px solid #f0ece6",
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "Outfit, sans-serif",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "#e5e7eb";
        const img = e.currentTarget.querySelector("img");
        if (img) img.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#f0ece6";
        const img = e.currentTarget.querySelector("img");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* Product Image Section */}
      <div
        style={{
          width: 130,
          flexShrink: 0,
          background: "#fafaf8",
          borderRight: "1px solid #f0ece6",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={orderItem.product?.images[0]}
          alt=''
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Top Row: Brand & Status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
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
            {order?.seller?.sellerName}
          </p>

          {/* Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: status.bg,
              padding: "4px 10px",
              borderRadius: "99px",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: status.color,
                boxShadow: `0 0 6px ${status.color}`,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: status.color,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {order?.orderStatus}
            </span>
          </div>
        </div>

        {/* Product Title */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: DARK,
            lineHeight: 1.3,
            marginBottom: 6,
            fontFamily: "Outfit, sans-serif",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            paddingRight: 32, // Leave space for chevron
          }}
        >
          {orderItem?.product?.title}
        </p>

        {/* Delivery Info */}
        <p style={{ fontSize: 13, color: "#5d5d5d", fontWeight: 500, fontFamily: "Outfit, sans-serif", marginBottom: 20 }}>
          Arriving by {deliveryLabel}
        </p>

        {/* Bottom Row: Details & Price */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 16,
            borderTop: "1px dashed #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Size</span>
              <span style={{ fontSize: 14, color: DARK, fontWeight: 700 }}>{orderItem?.size}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Qty</span>
              <span style={{ fontSize: 14, color: DARK, fontWeight: 700 }}>{quantity}</span>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            {orderItem?.sellingPrice && (
              <>
                <div style={{ fontSize: 18, fontWeight: 800, color: DARK, fontFamily: "Outfit, sans-serif" }}>
                  ${paidItemTotalIncludingShipping}
                </div>
                {itemShippingShare > 0 && (
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", fontFamily: "Outfit, sans-serif" }}>
                    + ${itemShippingShare} delivery
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Chevron */}
        <div style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", color: "#d1d5db" }}>
          <ChevronRight sx={{ fontSize: 28 }} />
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
