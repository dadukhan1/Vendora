/** @format */

import { TextField } from "@mui/material";
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

const BecomeSellerStep3 = ({
  formik,
}: {
  formik: FormikProps<SellerFormValues>;
}) => {
  return (
    <div className='flex flex-col gap-4 space-y-5'>
      <TextField
        fullWidth
        name='bankDetails.accountNumber'
        label='Account Number'
        placeholder='Enter account number'
        value={formik.values.bankDetails.accountNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountNumber &&
          Boolean(formik.errors.bankDetails?.accountNumber)
        }
        helperText={
          formik.touched.bankDetails?.accountNumber &&
          typeof formik.errors.bankDetails?.accountNumber === "string"
            ? formik.errors.bankDetails?.accountNumber
            : ""
        }
        sx={inputSx}
      />
      <TextField
        fullWidth
        name='bankDetails.accountHolderName'
        label='Account Holder Name'
        placeholder='Enter account holder name'
        value={formik.values.bankDetails.accountHolderName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountHolderName &&
          Boolean(formik.errors.bankDetails?.accountHolderName)
        }
        helperText={
          formik.touched.bankDetails?.accountHolderName &&
          typeof formik.errors.bankDetails?.accountHolderName === "string"
            ? formik.errors.bankDetails.accountHolderName
            : ""
        }
        sx={inputSx}
      />
    </div>
  );
};

export default BecomeSellerStep3;
