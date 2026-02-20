/** @format */

import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <h1 className='text-2xl text-center font-bold text-teal-500 mb-4'>
        Seller Signup
      </h1>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-3 mb-4'>
        <TextField
          fullWidth
          label='Full Name'
          id='fullName'
          name='fullName'
          value={formik.values.fullName}
          onChange={formik.handleChange}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={
            formik.touched.fullName && typeof formik.errors.fullName === "string"
              ? formik.errors.fullName
              : ""
          }
        />
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
        <Button sx={{ py: "12px" }} type='submit' variant='contained'>
          Signup
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
