/** @format */

import { CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../Redux Toolkit/store";
import {
  sendSigninSignupOTP,
  signin,
} from "../Redux Toolkit/features/auth/authSlice";
import { useNavigate } from "react-router";

const SigninForm = () => {
  const { auth } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    onSubmit: async (values) => {
      if (auth.otpSent) {
        const resultAction = await dispatch(signin(values));
        if (signin.fulfilled.match(resultAction)) {
          navigate("/");
          window.location.reload();
        }
      } else {
        await dispatch(sendSigninSignupOTP(values));
      }
    },
  });

  return (
    <div>
      <p className="section-eyebrow text-[#9ca3af] mb-1">Welcome back</p>
      <h2 className="text-[20px] font-[800] font-[Outfit] text-[#0a0a0a] mb-6">
        Sign in to your account
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
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email && typeof formik.errors.email === "string"
              ? formik.errors.email
              : ""
          }
          disabled={auth.otpSent}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              fontSize: "0.85rem",
              "& fieldset": { borderColor: "#f0ece6" },
              "&:hover fieldset": { borderColor: "#d4c4a8" },
              "&.Mui-focused fieldset": { borderColor: "#c9993a" },
            },
            "& .MuiInputLabel-root": { fontSize: "0.85rem", color: "#9ca3af" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a" },
          }}
        />

        {/* OTP field — slides in when sent */}
        {auth.otpSent && (
          <div className="animate-fade-up">
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
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  fontSize: "0.85rem",
                  letterSpacing: "0.2em",
                  "& fieldset": { borderColor: "#f0ece6" },
                  "&:hover fieldset": { borderColor: "#d4c4a8" },
                  "&.Mui-focused fieldset": { borderColor: "#c9993a" },
                },
                "& .MuiInputLabel-root": { fontSize: "0.85rem", color: "#9ca3af" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a" },
              }}
            />
          </div>
        )}

        {/* Submit button */}
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
            "Verify & Continue"
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

export default SigninForm;
