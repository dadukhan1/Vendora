/** @format */

import { Grid, TextField } from "@mui/material";
import type { FormikProps } from "formik/dist/types";

const BecomeSellerStep2 = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label='Name'
            id='pickupAddress.name'
            name='pickupAddress.name'
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.name &&
              Boolean(formik.errors.pickupAddress?.name)
            }
            helperText={
              formik.touched.pickupAddress?.name &&
              typeof formik.errors.pickupAddress?.name === "string"
                ? formik.errors.pickupAddress?.name
                : ""
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label='Mobile Number'
            id='pickupAddress.mobile'
            name='pickupAddress.mobile'
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.mobile &&
              Boolean(formik.errors.pickupAddress?.mobile)
            }
            helperText={
              formik.touched.pickupAddress?.mobile &&
              typeof formik.errors.pickupAddress?.mobile === "string"
                ? formik.errors.pickupAddress?.mobile
                : ""
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label='Full Address'
            id='pickupAddress.address'
            name='pickupAddress.address'
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label='City'
            id='pickupAddress.city'
            name='pickupAddress.city'
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12 } }>
          <TextField
            fullWidth
            label='State'
            id='pickupAddress.state'
            name='pickupAddress.state'
            value={formik.values.pickupAddress.state}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label='Pin Code'
            id='pickupAddress.pinCode'
            name='pickupAddress.pinCode'
            value={formik.values.pickupAddress.pinCode}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.pinCode &&
              Boolean(formik.errors.pickupAddress?.pinCode)
            }
            helperText={
              formik.touched.pickupAddress?.pinCode &&
              typeof formik.errors.pickupAddress?.pinCode === "string"
                ? formik.errors.pickupAddress?.pinCode
                : ""
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label='Locality'
            id='pickupAddress.locality'
            name='pickupAddress.locality'
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeSellerStep2;
