/** @format */

import { Button, CircularProgress, Alert, Box, Typography } from "@mui/material";
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

/* ─── Design tokens (dark palette matching BecomeSeller) ─────────── */
const G = "#c9993a";
const GLASS_BORDER = "rgba(255,255,255,0.1)";

const steps = [
  { label: "Contact", desc: "GSTIN & mobile" },
  { label: "Address", desc: "Pickup location" },
  { label: "Bank", desc: "Payment info" },
  { label: "Business", desc: "Brand details" },
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

  const validateStep = (step: number, values: SellerFormValues) => {
    const errors: any = {};
    if (step === 0) {
      if (!values.mobile) errors.mobile = "Mobile is required";
      if (!values.GSTIN) errors.GSTIN = "GSTIN is required";
    } else if (step === 1) {
      errors.pickupAddress = {};
      if (!values.pickupAddress.name) errors.pickupAddress.name = "Name is required";
      if (!values.pickupAddress.mobile) errors.pickupAddress.mobile = "Mobile is required";
      if (!values.pickupAddress.address) errors.pickupAddress.address = "Address is required";
      if (!values.pickupAddress.city) errors.pickupAddress.city = "City is required";
      if (!values.pickupAddress.state) errors.pickupAddress.state = "State is required";
      if (!values.pickupAddress.pinCode) errors.pickupAddress.pinCode = "PIN code is required";
      if (!values.pickupAddress.locality) errors.pickupAddress.locality = "Locality is required";
      if (Object.keys(errors.pickupAddress).length === 0) delete errors.pickupAddress;
    } else if (step === 2) {
      errors.bankDetails = {};
      if (!values.bankDetails.accountHolderName) errors.bankDetails.accountHolderName = "Account holder name is required";
      if (!values.bankDetails.accountNumber) errors.bankDetails.accountNumber = "Account number is required";
      if (Object.keys(errors.bankDetails).length === 0) delete errors.bankDetails;
    } else if (step === 3) {
      if (!values.sellerName) errors.sellerName = "Seller name is required";
      if (!values.email) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Invalid email format";
      if (!values.password) errors.password = "Password is required";
      else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
      errors.businessDetails = {};
      if (!values.businessDetails.businessName) errors.businessDetails.businessName = "Business name is required";
      if (!values.businessDetails.businessEmail) errors.businessDetails.businessEmail = "Business email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.businessDetails.businessEmail)) errors.businessDetails.businessEmail = "Invalid email format";
      if (!values.businessDetails.businessPhone) errors.businessDetails.businessPhone = "Business phone is required";
      if (!values.businessDetails.businessAddress) errors.businessDetails.businessAddress = "Business address is required";
      if (Object.keys(errors.businessDetails).length === 0) delete errors.businessDetails;
    }
    return errors;
  };

  const formik = useFormik<SellerFormValues>({
    initialValues: {
      mobile: "",
      otp: "",
      GSTIN: "",
      pickupAddress: { name: "", mobile: "", address: "", city: "", state: "", pinCode: "", locality: "" },
      bankDetails: { accountHolderName: "", accountNumber: "" },
      sellerName: "",
      email: "",
      businessDetails: { businessName: "", businessEmail: "", businessPhone: "", logo: "", banner: "", businessAddress: "" },
      password: "",
    },
    onSubmit: async (values) => {
      setError(null);
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
      const touched: any = {};
      if (errors.pickupAddress) { touched.pickupAddress = {}; Object.keys(errors.pickupAddress).forEach((k) => { touched.pickupAddress[k] = true; }); }
      if (errors.bankDetails) { touched.bankDetails = {}; Object.keys(errors.bankDetails).forEach((k) => { touched.bankDetails[k] = true; }); }
      if (errors.businessDetails) { touched.businessDetails = {}; Object.keys(errors.businessDetails).forEach((k) => { touched.businessDetails[k] = true; }); }
      Object.keys(errors).forEach((k) => { if (!["pickupAddress", "bankDetails", "businessDetails"].includes(k)) touched[k] = true; });
      formik.setTouched(touched);
      return;
    }
    setError(null);
    setActiveStep((prev) => Math.min(3, prev + 1));
  };

  const handleBack = () => { setError(null); setActiveStep((prev) => Math.max(0, prev - 1)); };
  const isLastStep = activeStep === steps.length - 1;
  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {/* Error */}
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{
            borderRadius: "12px",
            bgcolor: "rgba(224,60,84,0.1)",
            border: "1px solid rgba(224,60,84,0.3)",
            color: "#f2efe9",
            "& .MuiAlert-icon": { color: "#e03c54" },
            "& .MuiAlert-action svg": { color: "#7a7a8c" },
          }}
        >
          {error}
        </Alert>
      )}

      {/* ── Stepper ─────────────────────────────────────────────── */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
        {steps.map((step, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          return (
            <Box key={i} sx={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
              {/* Node */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.6 }}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    fontFamily: "'Outfit', sans-serif",
                    transition: "all 0.25s ease",
                    background: done
                      ? G
                      : active
                        ? "rgba(201,153,58,0.15)"
                        : "rgba(255,255,255,0.05)",
                    border: done
                      ? `2px solid ${G}`
                      : active
                        ? `2px solid ${G}`
                        : `2px solid rgba(255,255,255,0.12)`,
                    color: done ? "#0a0a0a" : active ? G : "#5a5a6a",
                    boxShadow: active ? `0 0 14px rgba(201,153,58,0.35)` : "none",
                  }}
                >
                  {done ? <CheckCircle sx={{ fontSize: 15 }} /> : <span>{i + 1}</span>}
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    fontFamily: "'Outfit', sans-serif",
                    color: active ? G : done ? "rgba(201,153,58,0.6)" : "#4a4a5a",
                    letterSpacing: 0.3,
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </Typography>
              </Box>

              {/* Connector */}
              {i < steps.length - 1 && (
                <Box
                  sx={{
                    flex: 1,
                    height: "2px",
                    mx: 0.75,
                    mb: 2,
                    borderRadius: "999px",
                    background: i < activeStep
                      ? `linear-gradient(90deg, ${G}, rgba(201,153,58,0.5))`
                      : "rgba(255,255,255,0.07)",
                    transition: "background 0.3s ease",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* Progress bar + step info */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: -1 }}>
        <Typography sx={{ fontSize: "0.72rem", color: "#5a5a6a", fontFamily: "'Outfit', sans-serif" }}>
          Step{" "}
          <Box component="span" sx={{ color: "#8a8a9a", fontWeight: 600 }}>{activeStep + 1}</Box>
          {" "}of {steps.length}
          <Box component="span" sx={{ mx: 1, color: "rgba(255,255,255,0.08)" }}>·</Box>
          <Box component="span" sx={{ color: "#6a6a7a" }}>{steps[activeStep].desc}</Box>
        </Typography>
        <Box
          sx={{
            px: 1.5,
            py: 0.3,
            borderRadius: "999px",
            background: "rgba(201,153,58,0.1)",
            border: "1px solid rgba(201,153,58,0.2)",
          }}
        >
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: G, fontFamily: "'Outfit', sans-serif" }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
      </Box>

      {/* Thin gold progress line */}
      <Box sx={{ width: "100%", height: "2px", bgcolor: "rgba(255,255,255,0.06)", borderRadius: "999px" }}>
        <Box
          sx={{
            height: "100%",
            borderRadius: "999px",
            background: `linear-gradient(90deg, ${G}, #e8c06a)`,
            width: `${progress}%`,
            transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: `0 0 8px rgba(201,153,58,0.5)`,
          }}
        />
      </Box>

      {/* ── Step content ─────────────────────────────────────────── */}
      <Box sx={{ minHeight: 200 }}>
        {activeStep === 0 ? <BecomeSellerStep1 formik={formik} />
          : activeStep === 1 ? <BecomeSellerStep2 formik={formik} />
          : activeStep === 2 ? <BecomeSellerStep3 formik={formik} />
          : <BecomeSellerStep4 formik={formik} />}
      </Box>

      {/* ── Navigation ───────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pt: 2,
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Back */}
        <Button
          variant="text"
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBack sx={{ fontSize: "14px !important" }} />}
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            color: "#5a5a6a",
            fontWeight: 500,
            fontSize: "0.85rem",
            fontFamily: "'Outfit', sans-serif",
            px: 2,
            py: 1,
            border: "1px solid transparent",
            "&:hover": {
              background: "rgba(255,255,255,0.04)",
              color: "#9ca3af",
              borderColor: GLASS_BORDER,
            },
            "&:disabled": { color: "#2a2a3a" },
          }}
        >
          Back
        </Button>

        {/* Next / Submit */}
        <Button
          variant="contained"
          onClick={isLastStep ? () => formik.handleSubmit() : handleNext}
          disabled={sellerAuth?.loading}
          endIcon={
            sellerAuth?.loading ? (
              <CircularProgress size={15} sx={{ color: "#0a0a0a" }} />
            ) : isLastStep ? (
              <CheckCircle sx={{ fontSize: "17px !important" }} />
            ) : (
              <ArrowForward sx={{ fontSize: "17px !important" }} />
            )
          }
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            background: `linear-gradient(135deg, #d4a843 0%, ${G} 100%)`,
            color: "#0a0a0a",
            fontWeight: 700,
            fontSize: "0.88rem",
            fontFamily: "'Outfit', sans-serif",
            px: 3.5,
            py: 1.1,
            boxShadow: `0 4px 20px rgba(201,153,58,0.4)`,
            letterSpacing: 0.3,
            transition: "all 0.2s ease",
            "&:hover": {
              background: `linear-gradient(135deg, #e8c06a 0%, #d4a843 100%)`,
              boxShadow: `0 6px 28px rgba(201,153,58,0.55)`,
              transform: "translateY(-1px)",
            },
            "&:active": { transform: "translateY(0)" },
            "&:disabled": {
              background: "rgba(255,255,255,0.06)",
              color: "#3a3a4a",
              boxShadow: "none",
            },
          }}
        >
          {sellerAuth?.loading
            ? "Please wait..."
            : isLastStep
              ? "Create Account"
              : "Continue"}
        </Button>
      </Box>
    </Box>
  );
};

export default SellerAccountForm;
