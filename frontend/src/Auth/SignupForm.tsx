/** @format */

import { CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../Redux Toolkit/store";
import { useNavigate } from "react-router";
import {
  sendSigninSignupOTP,
  signup,
} from "../Redux Toolkit/features/auth/authSlice";

const SignupForm = () => {
  const { auth } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { fullName: "", email: "", otp: "" },
    onSubmit: async (values) => {
      if (!auth.otpSent) {
        await dispatch(sendSigninSignupOTP({ email: values.email }));
      } else {
        await dispatch(signup(values));
        navigate("/");
      }
    },
  });

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      fontSize: "0.95rem",
      backgroundColor: "#fafaf8",
      transition: "all 0.2s ease",
      "& fieldset": { borderColor: "transparent" },
      "&:hover fieldset": { borderColor: "#e5e7eb" },
      "&.Mui-focused fieldset": { borderColor: "#c9993a", borderWidth: "2px" },
      "&.Mui-focused": { backgroundColor: "#fff", boxShadow: "0 4px 20px rgba(201,153,58,0.1)" },
    },
    "& .MuiInputLabel-root": { fontSize: "0.95rem", color: "#9ca3af", fontFamily: "Outfit, sans-serif" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a", fontWeight: 600 },
    "& .MuiInputBase-input": { fontFamily: "Outfit, sans-serif", padding: "16px 14px" },
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-[32px] font-[800] font-[Playfair_Display] text-[#0a0a0a] mb-2 leading-tight">
          Join Vendora
        </h2>
        <p className="text-[#9ca3af] text-[15px] font-[Outfit]">
          Create an account to discover curated premium finds.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        {/* Email */}
        <TextField
          fullWidth
          label="Email address"
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          disabled={auth.otpSent}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email && typeof formik.errors.email === "string"
              ? formik.errors.email
              : ""
          }
          sx={inputSx}
        />

        {/* Full Name + OTP */}
        {auth.otpSent && (
          <div className="flex flex-col gap-5 animate-fade-up">
            <TextField
              fullWidth
              label="Full Name"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              autoFocus
              disabled={auth.loading}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={
                formik.touched.fullName && typeof formik.errors.fullName === "string"
                  ? formik.errors.fullName
                  : ""
              }
              sx={inputSx}
            />

            <TextField
              fullWidth
              label="Enter 6-digit OTP"
              id="otp"
              name="otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              disabled={auth.loading}
              inputProps={{ maxLength: 6 }}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={
                formik.touched.otp && typeof formik.errors.otp === "string"
                  ? formik.errors.otp
                  : "We've sent a code to your email."
              }
              sx={{
                ...inputSx,
                "& .MuiOutlinedInput-root": {
                  ...inputSx["& .MuiOutlinedInput-root"],
                  letterSpacing: "0.5em",
                  textAlign: "center",
                },
                "& .MuiInputBase-input": { ...inputSx["& .MuiInputBase-input"], textAlign: "center", fontSize: "1.2rem", fontWeight: 700, color: "#0a0a0a" },
              }}
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={auth.loading}
          className="w-full py-4 mt-4 rounded-full bg-[#0a0a0a] text-white text-[14px] font-[700] font-[Outfit] tracking-wide shadow-[0_8px_20px_rgba(10,10,10,0.15)] hover:bg-[#c9993a] hover:shadow-[0_8px_24px_rgba(201,153,58,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
        >
          {auth.loading ? (
            <>
              <CircularProgress size={18} thickness={5} sx={{ color: "#fff" }} />
              <span>Please wait...</span>
            </>
          ) : auth.otpSent ? (
            "Create Account"
          ) : (
            "Continue with Email"
          )}
        </button>

        {/* Resend hint */}
        {auth.otpSent && (
          <p className="text-center text-[13px] text-[#9ca3af] font-[500] font-[Outfit] mt-2">
            Didn't receive it?{" "}
            <button
              type="button"
              onClick={() =>
                dispatch(sendSigninSignupOTP({ email: formik.values.email }))
              }
              className="text-[#c9993a] font-[700] hover:underline transition-all"
            >
              Resend Code
            </button>
          </p>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
