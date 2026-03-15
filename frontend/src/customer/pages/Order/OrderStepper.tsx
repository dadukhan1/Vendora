/** @format */

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  {
    name: "Packed",
    description: "Item Packed in Dispatch Warehouse",
    value: "CONFIRMED",
  },
  { name: "Shipped", description: "by Mon, 15 Jul", value: "SHIPPED" },
  { name: "Arriving", description: "by 16 Jul - 18 Jul", value: "ARRIVING" },
  { name: "Arrived", description: "by 16 Jul - 18 Jul", value: "DELIVERED" },
];

const canceledStep = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Order Canceled", description: "on Thu, 11 Jul", value: "CANCELLED" },
];

const OrderStepper = ({ orderStatus }: any) => {
  const [statusStep, setStatusStep] = useState(steps);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(canceledStep);
      setCurrentStep(1);
    } else {
      setStatusStep(steps);
      const index = steps.findIndex((step) => step.value === orderStatus);
      setCurrentStep(index);
    }
  }, [orderStatus]);

  const isCancelled = orderStatus === "CANCELLED";
  const activeColor = isCancelled ? "#FF4F00" : "#0F52FF";
  const activeBg = isCancelled ? "rgba(255,79,0,0.08)" : "rgba(15,82,255,0.08)";

  return (
    <Box style={{ margin: "8px 0" }}>
      {statusStep.map((step, index) => {
        const isActive = step.value === orderStatus;
        const isComplete = index < currentStep;
        const isLast = index === statusStep.length - 1;

        return (
          <div
            key={index}
            style={{ display: "flex", gap: 16, padding: "0 4px" }}
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
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isComplete || isActive ? activeColor : "#E2E8F0",
                  color: isComplete || isActive ? "#fff" : "#94A3B8",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                {isComplete ? (
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                ) : (
                  <FiberManualRecordIcon sx={{ fontSize: 12 }} />
                )}
              </div>

              {!isLast && (
                <div
                  style={{
                    width: 2,
                    height: 56,
                    borderRadius: 99,
                    background: isComplete ? activeColor : "#E2E8F0",
                    margin: "4px 0",
                    transition: "background 0.2s",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: isLast ? 0 : 8, flex: 1 }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  background: isActive
                    ? activeColor
                    : isComplete
                      ? activeBg
                      : "transparent",
                  color: isActive
                    ? "#fff"
                    : isComplete
                      ? activeColor
                      : "#94A3B8",
                  marginBottom: 4,
                  transition: "all 0.2s",
                }}
              >
                {step.name}
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: isActive ? "#64748B" : "#94A3B8",
                  paddingLeft: 4,
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
