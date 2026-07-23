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
      borderRadius: "14px",
      fontSize: "0.85rem",
      "& fieldset": { borderColor: "#f0ece6" },
      "&:hover fieldset": { borderColor: "#d4c4a8" },
      "&.Mui-focused fieldset": { borderColor: "#c9993a" },
    },
    "& .MuiInputLabel-root": { fontSize: "0.85rem", color: "#9ca3af" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a" },
  };

  return (
    <div>
      <p className="section-eyebrow text-[#9ca3af] mb-1">Join Vendora</p>
      <h2 className="text-[20px] font-[800] font-[Outfit] text-[#0a0a0a] mb-6">
        Create your account
      </h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
          <div className="flex flex-col gap-4 animate-fade-up">
            <TextField
              fullWidth
              label="Full Name"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
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
              label="Enter OTP"
              id="otp"
              name="otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 6 }}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={
                formik.touched.otp && typeof formik.errors.otp === "string"
                  ? formik.errors.otp
                  : "Check your inbox for the 6-digit code"
              }
              sx={{
                ...inputSx,
                "& .MuiOutlinedInput-root": {
                  ...inputSx["& .MuiOutlinedInput-root"],
                  letterSpacing: "0.25em",
                },
              }}
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={auth.loading}
          className="w-full py-3.5 mt-2 rounded-xl bg-[#0a0a0a] text-white text-[13px] font-[700] font-[Outfit] tracking-wider uppercase shadow-md hover:bg-[#c9993a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-250 flex items-center justify-center gap-2"
        >
          {auth.loading ? (
            <>
              <CircularProgress size={14} thickness={5} sx={{ color: "#fff" }} />
              <span>Verifying...</span>
            </>
          ) : auth.otpSent ? (
            "Create Account"
          ) : (
            "Send verification code"
          )}
        </button>

        {/* Resend hint */}
        {auth.otpSent && (
          <p className="text-center text-[12px] text-[#9ca3af] font-[500] font-[Outfit]">
            Didn't receive it?{" "}
            <button
              type="button"
              onClick={() =>
                dispatch(sendSigninSignupOTP({ email: formik.values.email }))
              }
              className="text-[#c9993a] font-[700] hover:underline"
            >
              Resend OTP
            </button>
          </p>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
