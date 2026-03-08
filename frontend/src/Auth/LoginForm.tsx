/** @format */

import { Button, Snackbar, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../Redux Toolkit/store";
import {
  sendLoginSignupOTP,
  signin,
} from "../Redux Toolkit/features/auth/authSlice";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const { auth } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      if (auth.otpSent) {
        const resultAction = await dispatch(signin(values));
        if (signin.fulfilled.match(resultAction)) {
          if (resultAction?.payload?.role === "ROLE_ADMIN") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          console.error("Failed to sign in:", resultAction.payload);
        }
      } else {
        await dispatch(sendLoginSignupOTP(values));
      }
    },
  });

  return (
    <div>
      <h1 className='text-2xl text-center font-bold text-teal-500 mb-5'>
        Login
      </h1>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
        <TextField
          fullWidth
          label=' Email'
          id='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email && typeof formik.errors.email === "string"
              ? formik.errors.email
              : ""
          }
        />
        {auth.otpSent && (
          <TextField
            fullWidth
            label='OTP'
            id='otp'
            name='otp'
            value={formik.values.otp}
            onChange={formik.handleChange}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={
              formik.touched.otp && typeof formik.errors.otp === "string"
                ? formik.errors.otp
                : ""
            }
          />
        )}
        <Button
          disabled={auth.loading}
          sx={{ py: "12px" }}
          type='submit'
          variant='contained'
        >
          {auth.loading ? "Loading..." : auth.otpSent ? "Login" : "Send OTP"}
        </Button>
      </form>
      <Snackbar
        open={auth.otpSent}
        autoHideDuration={2000}
        message='OTP sent successfully!'
      />
    </div>
  );
};

export default LoginForm;
