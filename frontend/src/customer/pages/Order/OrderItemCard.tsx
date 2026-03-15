/** @format */

import { ElectricBolt, ChevronRight } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router";

const statusColors: Record<string, { color: string; bg: string }> = {
  PLACED: { color: "#0F52FF", bg: "rgba(15,82,255,0.08)" },
  CONFIRMED: { color: "#0F52FF", bg: "rgba(15,82,255,0.08)" },
  SHIPPED: { color: "#FF4F00", bg: "rgba(255,79,0,0.08)" },
  ARRIVING: { color: "#FF4F00", bg: "rgba(255,79,0,0.08)" },
  DELIVERED: { color: "#16a34a", bg: "rgba(22,163,74,0.08)" },
  CANCELLED: { color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
};

const OrderItemCard = ({ orderItem, order }) => {
  const navigate = useNavigate();
  const status = statusColors[order?.orderStatus] ?? statusColors.PLACED;

  return (
    <div
      onClick={() =>
        navigate(`/account/orders/${order._id}/item/${orderItem._id}`)
      }
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 18,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = status.color;
        e.currentTarget.style.boxShadow = `0 0 0 3px ${status.bg}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E2E8F0";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Status strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          background: status.bg,
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar sx={{ bgcolor: status.color, width: 36, height: 36 }}>
            <ElectricBolt sx={{ fontSize: 18 }} />
          </Avatar>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: status.color,
                lineHeight: 1.3,
              }}
            >
              {order?.orderStatus}
            </p>
            <p style={{ fontSize: 12, color: "#64748B", marginTop: 1 }}>
              Arriving by {order?.deliveryDate}
            </p>
          </div>
        </div>
        <ChevronRight sx={{ fontSize: 20, color: "#94A3B8" }} />
      </div>

      {/* Product row */}
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "16px 20px",
          alignItems: "center",
        }}
      >
        {/* Image */}
        <div
          style={{
            width: 76,
            height: 88,
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #E2E8F0",
            flexShrink: 0,
            background: "#F8FAFC",
          }}
        >
          <img
            src={orderItem.product?.images[0]}
            alt=''
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            flex: 1,
            minWidth: 0,
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {order?.seller?.sellerName}
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#0F172A",
              lineHeight: 1.4,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {orderItem?.product?.title}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 2,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: status.color,
                background: status.bg,
                padding: "3px 12px",
                borderRadius: 99,
              }}
            >
              Size: {orderItem?.size}
            </span>
            {orderItem?.sellingPrice && (
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>
                ${orderItem?.sellingPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
