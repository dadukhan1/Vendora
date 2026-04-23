/** @format */

import { Grid, TextField } from "@mui/material";
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

const getFieldError = (
  formik: FormikProps<SellerFormValues>,
  fieldPath: string,
) => {
  const keys = fieldPath.split(".");
  let touched: any = formik.touched;
  let errors: any = formik.errors;

  for (const key of keys) {
    touched = touched?.[key];
    errors = errors?.[key];
    if (!touched && !errors) break;
  }

  return {
    touched: Boolean(touched),
    error: typeof errors === "string" ? errors : "",
  };
};

const BecomeSellerStep2 = ({
  formik,
}: {
  formik: FormikProps<SellerFormValues>;
}) => {
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
            helperText={getFieldError(formik, "pickupAddress.name").error}
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
            helperText={getFieldError(formik, "pickupAddress.mobile").error}
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
            error={
              formik.touched.pickupAddress?.address &&
              Boolean(formik.errors.pickupAddress?.address)
            }
            helperText={getFieldError(formik, "pickupAddress.address").error}
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
            error={
              formik.touched.pickupAddress?.city &&
              Boolean(formik.errors.pickupAddress?.city)
            }
            helperText={getFieldError(formik, "pickupAddress.city").error}
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
            error={
              formik.touched.pickupAddress?.state &&
              Boolean(formik.errors.pickupAddress?.state)
            }
            helperText={getFieldError(formik, "pickupAddress.state").error}
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
            helperText={getFieldError(formik, "pickupAddress.pinCode").error}
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
            error={
              formik.touched.pickupAddress?.locality &&
              Boolean(formik.errors.pickupAddress?.locality)
            }
            helperText={getFieldError(formik, "pickupAddress.locality").error}
            sx={inputSx}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeSellerStep2;
