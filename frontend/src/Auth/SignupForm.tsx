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
      borderRadius: "12px",
      fontSize: "0.9rem",
      "&.Mui-focused fieldset": { borderColor: "#0F52FF" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#0F52FF" },
  };

  return (
    <div>
      {/* Heading */}
      <p className='text-xs font-semibold uppercase tracking-[0.15em] text-[#94A3B8] mb-1'>
        New here?
      </p>
      <h2 className='text-xl font-bold text-[#0F172A] mb-6'>
        Create your account
      </h2>

      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
        {/* Email — always visible, locks after OTP sent */}
        <TextField
          fullWidth
          label='Email address'
          id='email'
          name='email'
          type='email'
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

        {/* Full Name + OTP — animate in after OTP sent */}
        {auth.otpSent && (
          <div className='flex flex-col gap-4 animate-[fadeSlideIn_0.25s_ease_forwards]'>
            <TextField
              fullWidth
              label='Full Name'
              id='fullName'
              name='fullName'
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={
                formik.touched.fullName &&
                typeof formik.errors.fullName === "string"
                  ? formik.errors.fullName
                  : ""
              }
              sx={inputSx}
            />

            <TextField
              fullWidth
              label='Enter OTP'
              id='otp'
              name='otp'
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
          type='submit'
          disabled={auth.loading}
          className='w-full py-3 mt-1 rounded-xl bg-[#0F52FF] text-white text-sm font-bold
            tracking-wide shadow-[0_4px_20px_rgba(15,82,255,0.28)]
            hover:opacity-90 active:scale-[.98] transition-all duration-150
            disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
            flex items-center justify-center gap-2'
        >
          {auth.loading ? (
            <>
              <CircularProgress
                size={16}
                thickness={5}
                sx={{ color: "#fff" }}
              />
              <span>Please wait...</span>
            </>
          ) : auth.otpSent ? (
            "Create Account →"
          ) : (
            "Send OTP"
          )}
        </button>

        {/* Resend hint */}
        {auth.otpSent && (
          <p className='text-center text-xs text-[#94A3B8]'>
            Didn't receive it?{" "}
            <button
              type='button'
              onClick={() =>
                dispatch(sendSigninSignupOTP({ email: formik.values.email }))
              }
              className='text-[#0F52FF] font-semibold hover:underline underline-offset-2'
            >
              Resend OTP
            </button>
          </p>
        )}
      </form>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SignupForm;
