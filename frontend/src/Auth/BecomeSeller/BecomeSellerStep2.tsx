/** @format */

import { Grid, TextField } from "@mui/material";
import type { FormikProps } from "formik/dist/types";
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
