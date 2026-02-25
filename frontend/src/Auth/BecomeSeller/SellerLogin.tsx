/** @format */

import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  sendLoginOtp,
  verifyLogin,
} from "../../Redux Toolkit/features/seller/sellerAuth";
import { useNavigate } from "react-router";

const SellerLogin = () => {
  const { sellerAuth } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      if (sellerAuth.otpSent) {
        const resultAction = await dispatch(verifyLogin(values));
        if (verifyLogin.fulfilled.match(resultAction)) {
          navigate("/");
        } else {
          console.error("Failed to Login :", resultAction.payload);
        }
      } else {
        dispatch(sendLoginOtp(values));
      }
    },
  });

  return (
    <div>
      <h1 className='text-2xl text-center font-bold text-teal-500 mb-5'>
        Seller Login
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
        {sellerAuth.otpSent && (
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
        <Button sx={{ py: "12px" }} type='submit' variant='contained'>
          {sellerAuth.otpSent ? "Login" : "Send OTP"}
        </Button>
      </form>
    </div>
  );
};

export default SellerLogin;
