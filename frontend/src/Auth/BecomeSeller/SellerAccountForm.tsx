/** @format */

import { Button, CircularProgress, Alert } from "@mui/material";
import { ArrowBack, ArrowForward, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import { useState } from "react";
import BecomeSellerStep1 from "./BecomeSellerStep1";
import BecomeSellerStep2 from "./BecomeSellerStep2";
import BecomeSellerStep3 from "./BecomeSellerStep3";
import BecomeSellerStep4 from "./BecomeSellerStep4";
import { signup } from "../../Redux Toolkit/features/seller/sellerAuth";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { useNavigate } from "react-router";

const steps = [
  { label: "Tax & Mobile", desc: "GSTIN & contact" },
  { label: "Pickup Address", desc: "Store location" },
  { label: "Bank Details", desc: "Payment info" },
  { label: "Business Info", desc: "Brand details" },
];

export interface SellerFormValues {
  mobile: string;
  otp: string;
  GSTIN: string;

  pickupAddress: {
    name: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    locality: string;
  };

  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
  };

  sellerName: string;
  email: string;

  businessDetails: {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    logo: string;
    banner: string;
    businessAddress: string;
  };

  password: string;
}

const SellerAccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sellerAuth } = useAppSelector((store) => store);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Manual validation function
  const validateStep = (step: number, values: SellerFormValues) => {
    const errors: any = {};

    if (step === 0) {
      // Step 1: Tax & Mobile
      if (!values.mobile) {
        errors.mobile = "Mobile is required";
      }

      if (!values.GSTIN) {
        errors.GSTIN = "GSTIN is required";
      }
    } else if (step === 1) {
      // Step 2: Pickup Address - nested structure
      errors.pickupAddress = {};

      if (!values.pickupAddress.name) {
        errors.pickupAddress.name = "Name is required";
      }
      if (!values.pickupAddress.mobile) {
        errors.pickupAddress.mobile = "Mobile is required";
      }
      if (!values.pickupAddress.address) {
        errors.pickupAddress.address = "Address is required";
      }
      if (!values.pickupAddress.city) {
        errors.pickupAddress.city = "City is required";
      }
      if (!values.pickupAddress.state) {
        errors.pickupAddress.state = "State is required";
      }
      if (!values.pickupAddress.pinCode) {
        errors.pickupAddress.pinCode = "PIN code is required";
      }
      if (!values.pickupAddress.locality) {
        errors.pickupAddress.locality = "Locality is required";
      }

      // Remove pickupAddress if no errors
      if (Object.keys(errors.pickupAddress).length === 0) {
        delete errors.pickupAddress;
      }
    } else if (step === 2) {
      // Step 3: Bank Details - nested structure
      errors.bankDetails = {};

      if (!values.bankDetails.accountHolderName) {
        errors.bankDetails.accountHolderName =
          "Account holder name is required";
      }
      if (!values.bankDetails.accountNumber) {
        errors.bankDetails.accountNumber = "Account number is required";
      }

      // Remove bankDetails if no errors
      if (Object.keys(errors.bankDetails).length === 0) {
        delete errors.bankDetails;
      }
    } else if (step === 3) {
      // Step 4: Business Info
      if (!values.sellerName) {
        errors.sellerName = "Seller name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email format";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      errors.businessDetails = {};

      if (!values.businessDetails.businessName) {
        errors.businessDetails.businessName = "Business name is required";
      }
      if (!values.businessDetails.businessEmail) {
        errors.businessDetails.businessEmail = "Business email is required";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.businessDetails.businessEmail)
      ) {
        errors.businessDetails.businessEmail = "Invalid email format";
      }
      if (!values.businessDetails.businessPhone) {
        errors.businessDetails.businessPhone = "Business phone is required";
      }
      if (!values.businessDetails.businessAddress) {
        errors.businessDetails.businessAddress = "Business address is required";
      }

      // Remove businessDetails if no errors
      if (Object.keys(errors.businessDetails).length === 0) {
        delete errors.businessDetails;
      }
    }

    return errors;
  };

  const formik = useFormik<SellerFormValues>({
    initialValues: {
      mobile: "",
      otp: "",
      GSTIN: "",
      pickupAddress: {
        name: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        locality: "",
      },
      bankDetails: {
        accountHolderName: "",
        accountNumber: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessPhone: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    onSubmit: async (values) => {
      setError(null);
      console.log(values);
      const resultAction = await dispatch(signup(values));
      if (signup.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        setError(
          typeof resultAction.payload === "string"
            ? resultAction.payload
            : "Failed to create account. Please try again.",
        );
      }
    },
  });

  const handleNext = () => {
    const errors = validateStep(activeStep, formik.values);

    if (Object.keys(errors).length > 0) {
      formik.setErrors(errors);

      // Set touched for nested fields properly
      const touched: any = {};
      if (errors.pickupAddress) {
        touched.pickupAddress = {};
        Object.keys(errors.pickupAddress).forEach((key) => {
          touched.pickupAddress[key] = true;
        });
      }
      if (errors.bankDetails) {
        touched.bankDetails = {};
        Object.keys(errors.bankDetails).forEach((key) => {
          touched.bankDetails[key] = true;
        });
      }
      if (errors.businessDetails) {
        touched.businessDetails = {};
        Object.keys(errors.businessDetails).forEach((key) => {
          touched.businessDetails[key] = true;
        });
      }
      Object.keys(errors).forEach((key) => {
        if (
          key !== "pickupAddress" &&
          key !== "bankDetails" &&
          key !== "businessDetails"
        ) {
          touched[key] = true;
        }
      });

      formik.setTouched(touched);
      return;
    }

    setError(null);
    setActiveStep((prev) => Math.min(3, prev + 1));
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <div className='flex flex-col gap-6'>
      {/* Error Alert */}
      {error && (
        <Alert severity='error' onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* ── Custom Stepper ── */}
      <div className='flex items-center gap-0'>
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          return (
            <div
              key={index}
              className='flex items-center flex-1 last:flex-none'
            >
              <div className='flex flex-col items-center gap-1.5'>
                <div
                  className='flex items-center justify-center w-7 h-7 rounded-full text-xs transition-all duration-200'
                  style={{
                    background: isCompleted || isActive ? "#0F52FF" : "#F8FAFC",
                    border: `2px solid ${isCompleted || isActive ? "#0F52FF" : "#E2E8F0"}`,
                    color: isCompleted || isActive ? "#fff" : "#94A3B8",
                    fontWeight: 700,
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle sx={{ fontSize: 14 }} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className='text-[10px] font-semibold whitespace-nowrap tracking-wide'
                  style={{ color: isActive ? "#0F172A" : "#94A3B8" }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className='flex-1 h-px mx-2 mb-5 transition-all duration-300'
                  style={{
                    background: index < activeStep ? "#0F52FF" : "#E2E8F0",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Step hint ── */}
      <div className='flex items-center justify-between'>
        <p className='text-xs text-[#94A3B8]'>
          Step{" "}
          <span className='text-[#64748B] font-semibold'>{activeStep + 1}</span>{" "}
          of {steps.length}
          <span className='mx-1.5 text-[#E2E8F0]'>·</span>
          <span className='text-[#64748B]'>{steps[activeStep].desc}</span>
        </p>
        <span
          className='text-[10px] font-semibold px-2 py-0.5 rounded-full'
          style={{ background: "#EFF6FF", color: "#0F52FF" }}
        >
          {Math.round(((activeStep + 1) / steps.length) * 100)}%
        </span>
      </div>

      {/* ── Thin progress bar ── */}
      <div className='w-full bg-[#E2E8F0] rounded-full h-0.5 -mt-3'>
        <div
          className='bg-[#0F52FF] h-0.5 rounded-full transition-all duration-500'
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* ── Step Content ── */}
      <div className='flex flex-col gap-4 min-h-[220px]'>
        {activeStep === 0 ? (
          <BecomeSellerStep1 formik={formik} />
        ) : activeStep === 1 ? (
          <BecomeSellerStep2 formik={formik} />
        ) : activeStep === 2 ? (
          <BecomeSellerStep3 formik={formik} />
        ) : (
          <BecomeSellerStep4 formik={formik} />
        )}
      </div>

      {/* ── Navigation ── */}
      <div className='flex items-center justify-between pt-4 border-t border-[#E2E8F0]'>
        <Button
          variant='text'
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBack sx={{ fontSize: "15px !important" }} />}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            color: "#64748B",
            fontWeight: 500,
            fontSize: "0.9rem",
            px: 2,
            "&:hover": { background: "#F8FAFC", color: "#0F172A" },
            "&:disabled": { color: "#E2E8F0" },
          }}
        >
          Back
        </Button>

        <Button
          variant='contained'
          onClick={isLastStep ? () => formik.handleSubmit() : handleNext}
          disabled={sellerAuth?.loading}
          endIcon={
            sellerAuth?.loading ? (
              <CircularProgress size={16} color='inherit' />
            ) : isLastStep ? (
              <CheckCircle sx={{ fontSize: "18px !important" }} />
            ) : (
              <ArrowForward sx={{ fontSize: "18px !important" }} />
            )
          }
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            background: "#0F52FF",
            fontWeight: 600,
            fontSize: "0.9rem",
            px: 3,
            py: "8px",
            boxShadow: "none",
            "&:hover": { background: "#0a42d4", boxShadow: "none" },
            "&:disabled": {
              background: "#E2E8F0",
              color: "#94A3B8",
              boxShadow: "none",
            },
          }}
        >
          {sellerAuth?.loading
            ? "Please wait..."
            : isLastStep
              ? "Create Account"
              : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default SellerAccountForm;
