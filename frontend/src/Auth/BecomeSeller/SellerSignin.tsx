/** @format */

import { Button, TextField, CircularProgress, Alert } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  sendSigninOtp,
  verifySignin,
} from "../../Redux Toolkit/features/seller/sellerAuth";
import { useNavigate } from "react-router";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontSize: "0.9rem",
    color: "#0F172A",
    background: "#F8FAFC",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#94A3B8" },
    "&.Mui-focused fieldset": { borderColor: "#0F52FF", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": { color: "#94A3B8", fontSize: "0.88rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0F52FF" },
  "& input::placeholder": { color: "#94A3B8", opacity: 1 },
};

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
    <div>
      {/* OTP sent notice */}
      {sellerAuth.otpSent && (
        <Alert
          severity='info'
          sx={{
            mb: 3,
            borderRadius: "10px",
            fontSize: "0.8rem",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            color: "#1d4ed8",
            "& .MuiAlert-icon": { color: "#0F52FF" },
          }}
        >
          OTP sent to <strong>{formik.values.email}</strong>. Check your inbox.
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
        {/* Email */}
        <div>
          <label className='block text-xs font-semibold text-[#64748B] mb-1.5 tracking-wide'>
            Email Address
          </label>
          <TextField
            fullWidth
            id='email'
            name='email'
            placeholder='you@example.com'
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
        </div>

        {/* OTP */}
        {sellerAuth.otpSent && (
          <div>
            <label className='block text-xs font-semibold text-[#64748B] mb-1.5 tracking-wide'>
              One-Time Password
            </label>
            <TextField
              fullWidth
              id='otp'
              name='otp'
              placeholder='Enter 6-digit OTP'
              value={formik.values.otp}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 6, letterSpacing: "0.3em" }}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={
                formik.touched.otp && typeof formik.errors.otp === "string"
                  ? formik.errors.otp
                  : ""
              }
              sx={inputSx}
            />
          </div>
        )}

        {/* Submit */}
        <Button
          type='submit'
          fullWidth
          variant='contained'
          disabled={sellerAuth.loading}
          endIcon={
            sellerAuth.loading ? (
              <CircularProgress size={16} color='inherit' />
            ) : (
              <ArrowForward sx={{ fontSize: "18px !important" }} />
            )
          }
          sx={{
            mt: 1,
            py: "12px",
            textTransform: "none",
            borderRadius: "10px",
            background: "#0F52FF",
            fontWeight: 600,
            fontSize: "0.9rem",
            boxShadow: "none",
            "&:hover": { background: "#0a42d4", boxShadow: "none" },
            "&:disabled": {
              background: "#E2E8F0",
              color: "#94A3B8",
              boxShadow: "none",
            },
          }}
        >
          {sellerAuth.loading
            ? "Please wait..."
            : sellerAuth.otpSent
              ? "Verify & Signin"
              : "Send OTP"}
        </Button>
      </form>
    </div>
  );
};

export default SellerSignin;
