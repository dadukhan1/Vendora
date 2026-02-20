/** @format */

import { TextField } from "@mui/material";
import type { FormikProps } from "formik/dist/types";

const BecomeSellerStep4 = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <div className='flex flex-col gap-4 space-y-5'>
      <TextField
        fullWidth
        label='Business Name'
        id='bussinessDetails.bussinessName'
        name='bussinessDetails.bussinessName'
        value={formik.values.bussinessDetails.bussinessName}
        onChange={formik.handleChange}
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
      />
      <TextField
        fullWidth
        label='Seller Name'
        id='bussinessDetails.sellerName'
        name='bussinessDetails.sellerName'
        value={formik.values.bussinessDetails.sellerName}
        onChange={formik.handleChange}
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
      />
      <TextField
        fullWidth
        label='Business Email'
        id='bussinessDetails.bussinessEmail'
        name='bussinessDetails.bussinessEmail'
        value={formik.values.bussinessDetails.bussinessEmail}
        onChange={formik.handleChange}
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
      />
      <TextField
        fullWidth
        label='Password'
        id='bussinessDetails.password'
        name='bussinessDetails.password'
        value={formik.values.bussinessDetails.password}
        onChange={formik.handleChange}
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
      />
    </div>
  );
};

export default BecomeSellerStep4;
