/** @format */

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GOLD = "#c9993a";
const ROSE = "#f43f5e";

const steps = [
  {
    name: "Order Placed",
    description: "Your order has been placed",
    value: "PENDING",
  },
  {
    name: "Confirmed",
    description: "Order confirmed by seller",
    value: "CONFIRMED",
  },
  {
    name: "Processing",
    description: "Item being prepared",
    value: "PROCESSING",
  },
  { name: "Shipped", description: "Order on the way", value: "SHIPPED" },
  { name: "Delivered", description: "Order delivered", value: "DELIVERED" },
];

const canceledStep = [
  {
    name: "Order Placed",
    description: "Your order has been placed",
    value: "PENDING",
  },
  {
    name: "Order Cancelled",
    description: "Order has been cancelled",
    value: "CANCELLED",
  },
];

interface OrderStepperProps {
  orderStatus?: string;
}

const OrderStepper = ({ orderStatus = "PENDING" }: OrderStepperProps) => {
  const [statusStep, setStatusStep] = useState(steps);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(canceledStep);
      setCurrentStep(1);
    } else {
      setStatusStep(steps);
      const index = steps.findIndex((step) => step.value === orderStatus);
      setCurrentStep(index >= 0 ? index : 0);
    }
  }, [orderStatus]);

  const isCancelled = orderStatus === "CANCELLED";
  const activeColor = isCancelled ? ROSE : GOLD;
  const activeBg = isCancelled ? "rgba(244,63,94,0.12)" : "rgba(201,153,58,0.12)";

  return (
    <Box style={{ margin: "16px 0", fontFamily: "Outfit, sans-serif" }}>
      {statusStep.map((step, index) => {
        const isActive = step.value === orderStatus;
        const isComplete = index < currentStep;
        const isLast = index === statusStep.length - 1;

        return (
          <div
            key={step.value}
            style={{ display: "flex", gap: 24, padding: "0 8px" }}
          >
            {/* Icon + line */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isComplete || isActive ? activeColor : "#f0ece6",
                  color: isComplete || isActive ? "#fff" : "#9ca3af",
                  flexShrink: 0,
                  boxShadow: (isComplete || isActive) ? `0 4px 16px ${activeBg}` : "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: `2px solid ${isComplete || isActive ? "transparent" : "#e5e7eb"}`,
                }}
              >
                {isComplete ? (
                  <CheckCircleIcon sx={{ fontSize: 20 }} />
                ) : (
                  <FiberManualRecordIcon sx={{ fontSize: 14 }} />
                )}
              </div>

              {!isLast && (
                <div
                  style={{
                    width: 2,
                    height: 56,
                    borderRadius: 99,
                    background: isComplete ? activeColor : "#f0ece6",
                    margin: "4px 0",
                    transition: "background 0.3s ease",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: isLast ? 0 : 8, flex: 1, paddingTop: 4 }}>
              <div
                style={{
                  display: "inline-block",
                  padding: isActive ? "6px 16px" : "4px 0",
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: isActive ? 800 : (isComplete ? 700 : 500),
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: isActive
                    ? activeColor
                    : "transparent",
                  color: isActive
                    ? "#fff"
                    : isComplete
                      ? activeColor
                      : "#9ca3af",
                  marginBottom: 6,
                  boxShadow: isActive ? `0 4px 12px ${activeBg}` : "none",
                  transition: "all 0.3s ease",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {step.name}
              </div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: isActive || isComplete ? 600 : 400,
                  color: isActive ? "#5d5d5d" : (isComplete ? "#5d5d5d" : "#9ca3af"),
                  paddingLeft: isActive ? 16 : 0,
                  margin: 0,
                  fontFamily: "Outfit, sans-serif",
                  transition: "all 0.3s ease",
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </Box>
  );
};

export default OrderStepper;
