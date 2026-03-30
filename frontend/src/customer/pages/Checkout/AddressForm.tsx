/** @format */

import { Grid, TextField, IconButton, Box, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../Redux Toolkit/store";
import { addAddress } from "../../../Redux Toolkit/features/customer/addressSlice";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    fontSize: 14,
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#94A3B8" },
    "&.Mui-focused fieldset": { borderColor: "#0F52FF", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0F52FF" },
  "& .MuiInputLabel-root": { fontSize: 14, color: "#64748B" },
};

const AddressForm = ({ paymentGateway, onClose }: any) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      locality: "",
    },
    onSubmit: (value) => {
      dispatch(addAddress(value));
    },
  });

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      {/* Heading */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 4,
              height: 24,
              background: "linear-gradient(180deg, #0F52FF 0%, #FF4F00 100%)",
              borderRadius: 0.5,
            }}
          />
          <Box
            sx={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: "-0.3px",
            }}
          >
            Contact Details
          </Box>
        </Box>
        {onClose && (
          <IconButton
            onClick={onClose}
            size='small'
            sx={{
              color: "#94A3B8",
              "&:hover": {
                color: "#FF4F00",
                background: "rgba(255,79,0,0.08)",
              },
              transition: "all 0.2s",
            }}
          >
            <Close fontSize='small' />
          </IconButton>
        )}
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2.5}>
          {/* Name */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='name'
              label='Full Name'
              value={formik.values.name}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>

          {/* Mobile + PinCode */}
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='mobile'
              label='Mobile'
              inputMode='numeric'
              value={formik.values.mobile}
              onChange={(e) =>
                formik.setFieldValue(
                  "mobile",
                  e.target.value.replace(/[^0-9]/g, ""),
                )
              }
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='pinCode'
              label='Pin Code'
              inputMode='numeric'
              value={formik.values.pinCode}
              onChange={(e) =>
                formik.setFieldValue(
                  "pinCode",
                  e.target.value.replace(/[^0-9]/g, ""),
                )
              }
              onBlur={formik.handleBlur}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
              sx={fieldSx}
            />
          </Grid>

          {/* Address */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='address'
              label='Address (House No, Building, Street)'
              value={formik.values.address}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>

          {/* Locality */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='locality'
              label='Locality / Town'
              value={formik.values.locality}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>

          {/* City + State */}
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='city'
              label='City'
              value={formik.values.city}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='state'
              label='State'
              value={formik.values.state}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>

          {/* Submit */}
          <Grid size={{ xs: 12 }}>
            <Button
              onClick={() => onClose()}
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                background: "linear-gradient(135deg, #0F52FF 0%, #0D3ABF 100%)",
                color: "white",
                py: 1.75,
                fontSize: "0.95rem",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(15, 82, 255, 0.28)",
                letterSpacing: "0.5px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #0D3ABF 0%, #0A2885 100%)",
                  boxShadow: "0 6px 24px rgba(15, 82, 255, 0.35)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
            >
              Save Address
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;
