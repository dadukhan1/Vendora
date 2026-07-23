/** @format */

import { Box, TextField } from "@mui/material";
import type { FormikProps } from "formik";
import type { SellerFormValues } from "./SellerAccountForm";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    fontSize: "0.88rem",
    color: "#f2efe9",
    background: "rgba(255,255,255,0.04)",
    fontFamily: "'Outfit', sans-serif",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": { borderColor: "#c9993a", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": { color: "#6b6b7e", fontSize: "0.87rem", fontFamily: "'Outfit', sans-serif" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a" },
  "& input::placeholder": { color: "#4a4a5a", opacity: 1 },
  "& .MuiFormHelperText-root": { color: "#e03c54", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem" },
};

const BecomeSellerStep1 = ({
  formik,
}: {
  formik: FormikProps<SellerFormValues>;
}) => {
  return (
    <Box>
      <p style={{ fontSize: "1rem", fontWeight: 700, textAlign: "center", paddingBottom: "20px", color: "#f2efe9", fontFamily: "'Playfair Display', serif" }}>Contact Details</p>
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
