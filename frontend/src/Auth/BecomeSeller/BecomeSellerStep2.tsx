/** @format */

import { Grid, TextField } from "@mui/material";
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

const BecomeSellerStep2 = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label='Name'
            placeholder='Enter full name'
            id='pickupAddress.name'
            name='pickupAddress.name'
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            sx={inputSx}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label='Mobile Number'
            placeholder='Enter mobile number'
            id='pickupAddress.mobile'
            name='pickupAddress.mobile'
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            sx={inputSx}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label='Full Address'
            placeholder='House / flat / street'
            id='pickupAddress.address'
            name='pickupAddress.address'
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={inputSx}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label='City'
            placeholder='Enter city'
            id='pickupAddress.city'
            name='pickupAddress.city'
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={inputSx}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label='State'
            placeholder='Enter state'
            id='pickupAddress.state'
            name='pickupAddress.state'
            value={formik.values.pickupAddress.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={inputSx}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label='Pin Code'
            placeholder='6-digit pin code'
            id='pickupAddress.pinCode'
            name='pickupAddress.pinCode'
            value={formik.values.pickupAddress.pinCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            sx={inputSx}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label='Locality'
            placeholder='Area / locality'
            id='pickupAddress.locality'
            name='pickupAddress.locality'
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={inputSx}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeSellerStep2;
