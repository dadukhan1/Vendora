/** @format */

import { Button, Snackbar, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelectore } from "../Redux Toolkit/store";
import { useNavigate } from "react-router";
import {
  sendLoginSignupOTP,
  signup,
} from "../Redux Toolkit/features/auth/authSlice";

const SignupForm = () => {
  const { auth } = useAppSelectore((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      if (!auth.otpSent) {
        await dispatch(sendLoginSignupOTP({ email: values.email }));
      } else {
        await dispatch(signup(values));
        navigate("/");
      }
    },
  });

  return (
    <div>
      <h1 className='text-2xl text-center font-bold text-teal-500 mb-4'>
        Signup
      </h1>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-3 mb-4'>
        {auth.otpSent && (
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
          />
        )}
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
          {auth.loading ? "Loading..." : auth.otpSent ? "Signup" : "Send OTP"}
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

export default SignupForm;
