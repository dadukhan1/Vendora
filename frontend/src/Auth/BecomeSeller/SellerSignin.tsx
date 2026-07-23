/** @format */

import { Button, TextField, CircularProgress, Alert, Box, Typography } from "@mui/material";
import { ArrowForward, MarkEmailRead, LockOpen } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  sendSigninOtp,
  verifySignin,
} from "../../Redux Toolkit/features/seller/sellerAuth";
import { useNavigate } from "react-router";

/* ─── Dark glass input theme ─────────────────────────────────────── */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    fontSize: "0.88rem",
    color: "#f2efe9",
    background: "rgba(255,255,255,0.04)",
    fontFamily: "'Outfit', sans-serif",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": { borderColor: "#c9993a", borderWidth: "1.5px" },
    "&.Mui-disabled": {
      background: "rgba(255,255,255,0.02)",
      "& fieldset": { borderColor: "rgba(255,255,255,0.05) !important" },
    },
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#4a4a5a",
  },
  "& .MuiInputLabel-root": {
    color: "#6b6b7e",
    fontSize: "0.87rem",
    fontFamily: "'Outfit', sans-serif",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a" },
  "& .MuiInputLabel-root.Mui-disabled": { color: "#3a3a4a" },
  "& input::placeholder": { color: "#4a4a5a", opacity: 1 },
  "& .MuiFormHelperText-root": {
    color: "#e03c54",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.75rem",
  },
};

/* ─── Label component ─────────────────────────────────────────────── */
const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: "0.72rem",
      fontWeight: 700,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      color: "#5a5a6a",
      mb: 0.75,
      fontFamily: "'Outfit', sans-serif",
    }}
  >
    {children}
  </Typography>
);

/* ─── Component ──────────────────────────────────────────────────── */
const SellerSignin = () => {
  const { sellerAuth } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    onSubmit: async (values) => {
      if (sellerAuth.otpSent) {
        const resultAction = await dispatch(verifySignin(values));
        if (verifySignin.fulfilled.match(resultAction)) {
          navigate("/");
          window.location.reload();
        } else {
          console.error("Failed to Signin:", resultAction.payload);
        }
      } else {
        dispatch(sendSigninOtp(values));
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

      {/* OTP sent notice */}
      {sellerAuth.otpSent && (
        <Alert
          icon={<MarkEmailRead sx={{ fontSize: 18, color: "#c9993a" }} />}
          severity="info"
          sx={{
            borderRadius: "12px",
            fontSize: "0.82rem",
            background: "rgba(201,153,58,0.08)",
            border: "1px solid rgba(201,153,58,0.25)",
            color: "#c8c4bc",
            fontFamily: "'Outfit', sans-serif",
            "& .MuiAlert-icon": { alignItems: "center" },
            "& strong": { color: "#c9993a" },
          }}
        >
          OTP sent to <strong>{formik.values.email}</strong>. Check your inbox.
        </Alert>
      )}

      {/* Email field */}
      <Box>
        <FieldLabel>Email Address</FieldLabel>
        <TextField
          fullWidth
          id="email"
          name="email"
          placeholder="you@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          disabled={sellerAuth.otpSent}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email && typeof formik.errors.email === "string"
              ? formik.errors.email
              : ""
          }
          sx={inputSx}
        />
      </Box>

      {/* OTP field — revealed after email submit */}
      {sellerAuth.otpSent && (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.75 }}>
            <FieldLabel>One-Time Password</FieldLabel>
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: "#c9993a",
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => dispatch(sendSigninOtp({ email: formik.values.email, otp: "" }))}
            >
              Resend OTP
            </Typography>
          </Box>
          <TextField
            fullWidth
            id="otp"
            name="otp"
            placeholder="● ● ● ● ● ●"
            value={formik.values.otp}
            onChange={formik.handleChange}
            inputProps={{ maxLength: 6 }}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={
              formik.touched.otp && typeof formik.errors.otp === "string"
                ? formik.errors.otp
                : ""
            }
            sx={{
              ...inputSx,
              "& input": {
                letterSpacing: "0.4em",
                fontWeight: 700,
                fontSize: "1.1rem",
                textAlign: "center",
                fontFamily: "'Outfit', sans-serif",
              },
            }}
          />
          {/* OTP hint */}
          <Typography sx={{ fontSize: "0.72rem", color: "#4a4a5a", mt: 0.75, fontFamily: "'Outfit', sans-serif" }}>
            Enter the 6-digit code sent to your email.
          </Typography>
        </Box>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={sellerAuth.loading}
        endIcon={
          sellerAuth.loading ? (
            <CircularProgress size={15} sx={{ color: "#0a0a0a" }} />
          ) : sellerAuth.otpSent ? (
            <LockOpen sx={{ fontSize: "17px !important" }} />
          ) : (
            <ArrowForward sx={{ fontSize: "17px !important" }} />
          )
        }
        sx={{
          mt: 0.5,
          py: 1.4,
          textTransform: "none",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #d4a843 0%, #c9993a 100%)",
          color: "#0a0a0a",
          fontWeight: 700,
          fontSize: "0.9rem",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: 0.3,
          boxShadow: "0 4px 20px rgba(201,153,58,0.4)",
          transition: "all 0.2s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #e8c06a 0%, #d4a843 100%)",
            boxShadow: "0 6px 28px rgba(201,153,58,0.55)",
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
        {sellerAuth.loading
          ? "Please wait..."
          : sellerAuth.otpSent
            ? "Verify & Sign In"
            : "Send OTP"}
      </Button>

      {/* Step indicator dots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: -0.5 }}>
        {[0, 1].map((i) => {
          const active = sellerAuth.otpSent ? i === 1 : i === 0;
          return (
            <Box
              key={i}
              sx={{
                width: active ? 20 : 6,
                height: 6,
                borderRadius: "999px",
                background: active ? "#c9993a" : "rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default SellerSignin;
