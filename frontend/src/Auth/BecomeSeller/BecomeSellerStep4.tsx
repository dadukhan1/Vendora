/** @format */

import { TextField } from "@mui/material";
import type { FormikProps } from "formik/dist/types";
import type { SellerFormValues } from "./SellerAccountForm";

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

const BecomeSellerStep4 = ({
  formik,
}: {
  formik: FormikProps<SellerFormValues>;
}) => {
  return (
    <div className='flex flex-col gap-4 space-y-5'>
      <TextField
        fullWidth
        label='Business Name'
        placeholder='Enter your business name'
        id='businessDetails.businessName'
        name='businessDetails.businessName'
        value={formik.values.businessDetails.businessName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.businessDetails?.businessName &&
          Boolean(formik.errors.businessDetails?.businessName)
        }
        helperText={
          formik.touched.businessDetails?.businessName &&
          typeof formik.errors.businessDetails?.businessName === "string"
            ? formik.errors.businessDetails?.businessName
            : ""
        }
        sx={inputSx}
      />
      <TextField
        fullWidth
        label='Seller Name'
        placeholder='Enter your name'
        id='sellerName'
        name='sellerName'
        value={formik.values.sellerName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
        helperText={
          formik.touched.sellerName &&
          typeof formik.errors.sellerName === "string"
            ? formik.errors.sellerName
            : ""
        }
        sx={inputSx}
      />
      <TextField
        fullWidth
        label='Business Email'
        placeholder='Enter business email'
        id='businessDetails.businessEmail'
        name='businessDetails.businessEmail'
        value={formik.values.businessDetails.businessEmail}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.businessDetails?.businessEmail &&
          Boolean(formik.errors.businessDetails?.businessEmail)
        }
        helperText={
          formik.touched.businessDetails?.businessEmail &&
          typeof formik.errors.businessDetails?.businessEmail === "string"
            ? formik.errors.businessDetails?.businessEmail
            : ""
        }
        sx={inputSx}
      />
      <TextField
        fullWidth
        label='Password'
        placeholder='Enter a password'
        type='password'
        id='password'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password && typeof formik.errors.password === "string"
            ? formik.errors.password
            : ""
        }
        sx={inputSx}
      />
    </div>
  );
};

export default BecomeSellerStep4;
