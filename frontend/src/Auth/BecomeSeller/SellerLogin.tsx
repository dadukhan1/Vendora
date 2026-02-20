/** @format */

import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";

const SellerLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
        <Button sx={{py: '12px'}} type='submit' variant='contained'>Login</Button>
      </form>
    </div>
  );
};

export default SellerLogin;
