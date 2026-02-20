/** @format */

import { TextField } from "@mui/material";
import type { FormikProps } from "formik";

const BecomeSellerStep3 = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <div className='flex flex-col gap-4 space-y-5'>
      <TextField
        fullWidth
        name='bankDetails.accountNumber'
        label='Account Number'
        value={formik.values.bankDetails.accountNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.bankDetails?.accountNumber &&
          Boolean(formik.errors.bankDetails?.accountNumber)
        }
        helperText={
          formik.touched.bankDetails?.accountNumber &&
          typeof formik.errors.bankDetails?.accountNumber === "string"
            ? formik.errors.bankDetails.accountNumber
            : ""
        }
      />
      <TextField
        fullWidth
        name='bankDetails.accountHOlderName'
        label='Account Holder Name'
        value={formik.values.bankDetails.accountHOlderName}
        onChange={formik.handleChange}
        error={
          formik.touched.bankDetails?.accountHOlderName &&
          Boolean(formik.errors.bankDetails?.accountHOlderName)
        }
        helperText={
          formik.touched.bankDetails?.accountHOlderName &&
          typeof formik.errors.bankDetails?.accountHOlderName === "string"
            ? formik.errors.bankDetails.accountHOlderName
            : ""
        }
      />
    </div>
  );
};

export default BecomeSellerStep3;
