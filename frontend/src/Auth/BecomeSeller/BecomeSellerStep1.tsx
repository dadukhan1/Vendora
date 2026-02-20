/** @format */

import { Box, TextField } from "@mui/material";
import type { FormikProps } from "formik";

const BecomeSellerStep1 = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <Box>
      <p className='text-xl font-bold text-center pb-9'>Contact Details</p>
      <div className='flex flex-col gap-4 space-y-9'>
        <TextField
          fullWidth
          label='Mobile Number'
          id='mobile'
          name='mobile'
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={
            formik.touched.mobile && typeof formik.errors.mobile === "string"
              ? formik.errors.mobile
              : ""
          }
        />
        <TextField
          fullWidth
          label='GSTIN'
          id='GSTIN'
          name='GSTIN'
          value={formik.values.GSTIN}
          onChange={formik.handleChange}
          error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
          helperText={
            formik.touched.GSTIN && typeof formik.errors.GSTIN === "string"
              ? formik.errors.GSTIN
              : ""
          }
        />
      </div>
    </Box>
  );
};

export default BecomeSellerStep1;
