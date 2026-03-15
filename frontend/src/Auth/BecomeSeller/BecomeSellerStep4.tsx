/** @format */

import { TextField } from "@mui/material";
import type { FormikProps } from "formik/dist/types";

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

const BecomeSellerStep4 = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <div className='flex flex-col gap-4 space-y-5'>
      <TextField
        fullWidth
        label='Business Name'
        placeholder='Enter your business name'
        id='bussinessDetails.bussinessName'
        name='bussinessDetails.bussinessName'
        value={formik.values.bussinessDetails.bussinessName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bussinessDetails?.bussinessName &&
          Boolean(formik.errors.bussinessDetails?.bussinessName)
        }
        helperText={
          formik.touched.bussinessDetails?.bussinessName &&
          typeof formik.errors.bussinessDetails?.bussinessName === "string"
            ? formik.errors.bussinessDetails?.bussinessName
            : ""
        }
        sx={inputSx}
      />
      <TextField
        fullWidth
        label='Seller Name'
        placeholder='Enter your name'
        id='bussinessDetails.sellerName'
        name='bussinessDetails.sellerName'
        value={formik.values.bussinessDetails.sellerName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bussinessDetails?.sellerName &&
          Boolean(formik.errors.bussinessDetails?.sellerName)
        }
        helperText={
          formik.touched.bussinessDetails?.sellerName &&
          typeof formik.errors.bussinessDetails?.sellerName === "string"
            ? formik.errors.bussinessDetails?.sellerName
            : ""
        }
        sx={inputSx}
      />
      <TextField
        fullWidth
        label='Business Email'
        placeholder='Enter business email'
        id='bussinessDetails.bussinessEmail'
        name='bussinessDetails.bussinessEmail'
        value={formik.values.bussinessDetails.bussinessEmail}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bussinessDetails?.bussinessEmail &&
          Boolean(formik.errors.bussinessDetails?.bussinessEmail)
        }
        helperText={
          formik.touched.bussinessDetails?.bussinessEmail &&
          typeof formik.errors.bussinessDetails?.bussinessEmail === "string"
            ? formik.errors.bussinessDetails?.bussinessEmail
            : ""
        }
        sx={inputSx}
      />
      <TextField
        fullWidth
        label='Password'
        placeholder='Enter a password'
        type='password'
        id='bussinessDetails.password'
        name='bussinessDetails.password'
        value={formik.values.bussinessDetails.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bussinessDetails?.password &&
          Boolean(formik.errors.bussinessDetails?.password)
        }
        helperText={
          formik.touched.bussinessDetails?.password &&
          typeof formik.errors.bussinessDetails?.password === "string"
            ? formik.errors.bussinessDetails?.password
            : ""
        }
        sx={inputSx}
      />
    </div>
  );
};

export default BecomeSellerStep4;
