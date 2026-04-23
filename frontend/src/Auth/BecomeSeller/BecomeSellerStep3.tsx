/** @format */

import { TextField } from "@mui/material";
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
