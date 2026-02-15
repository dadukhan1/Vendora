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

  return (
    <Box className='mx-auto my-10'>
      {statusStep.map((step, index) => (
        <div key={index} className='flex px-4'>
          {/* LEFT ICON + LINE */}
          <div className='flex flex-col items-center'>
            <Box
              className={`w-8 h-8 rounded-full flex items-center justify-center
              ${
                index <= steps.length
                  ? orderStatus === "CANCELLED"
                    ? "bg-red-500 text-white"
                    : "bg-teal-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index < currentStep ? (
                <CheckCircleIcon />
              ) : (
                <FiberManualRecordIcon fontSize='small' />
              )}
            </Box>

            {/* Vertical Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-20 
                ${
                  index < currentStep
                    ? orderStatus === "CANCELLED"
                      ? "bg-red-500"
                      : "bg-teal-500"
                    : "bg-gray-400"
                }`}
              />
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div className='ml-4 w-full'>
            <div
              className={`p-2 rounded-md font-medium
              ${
                step.value === orderStatus
                  ? orderStatus === "CANCELLED"
                    ? "bg-red-500 text-white"
                    : "bg-primary-color text-white"
                  : ""
              }`}
            >
              {step.name}
            </div>

            <p
              className={`text-xs ml-2 ${
                step.value === orderStatus ? "text-gray-200" : "text-gray-500"
              }`}
            >
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </Box>
  );
};

export default OrderStepper;
