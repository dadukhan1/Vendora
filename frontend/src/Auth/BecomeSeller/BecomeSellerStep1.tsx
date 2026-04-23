/** @format */

import { Box, TextField } from "@mui/material";
import type { FormikProps } from "formik";
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

const BecomeSellerStep1 = ({
  formik,
}: {
  formik: FormikProps<SellerFormValues>;
}) => {
  return (
    <Box>
      <p className='text-xl font-bold text-center pb-9'>Contact Details</p>
      <div className='flex flex-col gap-4 space-y-9'>
        <TextField
          fullWidth
          label='Mobile Number'
          placeholder='Enter your mobile number'
          id='mobile'
          name='mobile'
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={
            formik.touched.mobile && typeof formik.errors.mobile === "string"
              ? formik.errors.mobile
              : ""
          }
          sx={inputSx}
        />
        <TextField
          fullWidth
          label='GSTIN'
          placeholder='Enter your GSTIN'
          id='GSTIN'
          name='GSTIN'
          value={formik.values.GSTIN}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
          helperText={
            formik.touched.GSTIN && typeof formik.errors.GSTIN === "string"
              ? formik.errors.GSTIN
              : ""
          }
          sx={inputSx}
        />
      </div>
    </Box>
  );
};

export default BecomeSellerStep1;
